import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { admin, db } from '../config/firebase';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import * as fs from 'fs';
import * as path from 'path';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const router = Router();
const JWT_SECRET = process.env.SECRET_KEY || 'default_secret_key';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const BACKEND_URL = process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'https://adventurer-backend.onrender.com' : 'http://localhost:5000');

// Load Google client secret from ENV or fallback to client_secret.json file
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

try {
  if (!GOOGLE_CLIENT_ID) {
    const clientSecretFile = fs.readFileSync(path.resolve(__dirname, '../../client_secret.json'), 'utf8');
    const clientSecretJson = JSON.parse(clientSecretFile);
    GOOGLE_CLIENT_ID = clientSecretJson.web.client_id;
    GOOGLE_CLIENT_SECRET = clientSecretJson.web.client_secret;
  }
} catch (e) {
  console.warn("Could not load client_secret.json for Google OAuth");
}

const REDIRECT_URI = `${BACKEND_URL}/google/callback`;

const oauth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'traveler' },
    JWT_SECRET,
    { expiresIn: '3d' }
  );
};

const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Essential for Vercel <-> Render cross-domain
    maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
  });
};

const saveUserToFirebase = async (userData: any) => {
  const usersRef = db.collection('users');
  const role = userData.role || 'traveler';
  const documentData: any = {
    email: userData.email,
    password: userData.password,
    name: userData.name || '',
    role: role,
    authProvider: userData.authProvider || (userData.google_auth ? 'google' : 'password'),
    createdAt: new Date().toISOString(),
    last_login: new Date().toISOString(),
    onboardingProgress: 33, // Step 1 completed (33%)
    onboardingCompleted: false,
    profileCompleted: false
  };

  if (role === 'traveler') {
    documentData.travelerProfile = {
      userTags: [],
      travelStyle: '',
      budget: 25000,
      duration: '',
      gender: null,
      dateOfBirth: null,
      emergencyContact: { name: '', phone: '', relation: '' }
    };
  } else if (role === 'organizer') {
    documentData.organizationProfile = {
      companyName: userData.companyName || '',
      gstNumber: userData.gstNumber || '',
      tripsConducted: 0,
      touristsHelped: 0,
      teamSize: 1,
      specialityTags: [],
      statesCovered: [],
      isVerified: false,
      experienceYears: 0
    };
  } else if (role === 'guide') {
    documentData.guideProfile = {
      nativeLocation: '',
      languagesSpoken: [],
      availability: 'all',
      pricePerTrek: 1000,
      averageRating: 0,
      totalReviews: 0,
      isActiveListing: true,
      experienceYears: 0
    };
  }

  if (userData.google_auth) documentData.google_auth = true;
  if (userData.profile_picture) documentData.profile_picture = userData.profile_picture;

  await usersRef.doc(userData.id).set(documentData);
};

const getUserByEmail = async (email: string) => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', email).limit(1).get();
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

const updateUserLoginTime = async (userId: string) => {
  await db.collection('users').doc(userId).update({ last_login: new Date().toISOString() });
};

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role = 'traveler', name = '', companyName = '', gstNumber = '' } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    
    const userData = {
      id, email, password: hashedPassword, role, name, companyName, gstNumber, authProvider: 'password'
    };

    await saveUserToFirebase(userData);
    
    const token = generateToken(userData);
    setAuthCookie(res, token);
    res.json({ id, email, role, onboardingProgress: 33 });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.authProvider === 'google' || user.google_auth === true) {
      return res.status(401).json({ error: 'This email is registered using Google sign-in. Please click "Continue with Google".' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    await updateUserLoginTime(user.id);
    const token = generateToken(user);
    setAuthCookie(res, token);
    
    res.json({ 
      id: user.id, 
      email: user.email, 
      role: user.role, 
      onboardingProgress: user.onboardingProgress ?? 33 
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/google/login', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid'
    ]
  });
  res.json({ url });
});

router.get('/google/callback', async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) throw new Error('No email returned from Google');

    const email = payload.email;
    const pictureUrl = payload.picture || '';
    const name = payload.name || '';

    let user: any = await getUserByEmail(email);
    if (!user) {
      const hashedPassword = await bcrypt.hash("GOOGLE_AUTH_USER_PROTECTED", 10);
      const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
      const userData = {
        id, email, password: hashedPassword, google_auth: true, profile_picture: pictureUrl, name, role: 'traveler', authProvider: 'google'
      };
      await saveUserToFirebase(userData);
      user = userData;
    } else {
      const updates: any = {};
      if (!user.profile_picture) updates.profile_picture = pictureUrl;
      if (!user.name) updates.name = name;
      if (Object.keys(updates).length > 0) {
        await db.collection('users').doc(user.id).update(updates);
      }
      await updateUserLoginTime(user.id);
    }

    const token = generateToken(user);
    setAuthCookie(res, token);
    
    // Redirect dynamically to Vercel/CLIENT_URL
    res.redirect(`${CLIENT_URL}/explore?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${CLIENT_URL}/login?error=google_auth_failed`);
  }
});

router.post('/google/one-tap', async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    const ticket = await oauth2Client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) throw new Error('No email from Google');

    const email = payload.email;
    const pictureUrl = payload.picture || '';
    const name = payload.name || '';

    let user: any = await getUserByEmail(email);
    if (!user) {
      const hashedPassword = await bcrypt.hash("GOOGLE_AUTH_USER_PROTECTED", 10);
      const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
      const userData = {
        id, email, password: hashedPassword, google_auth: true, profile_picture: pictureUrl, name, role: 'traveler', authProvider: 'google'
      };
      await saveUserToFirebase(userData);
      user = userData;
    } else {
      const updates: any = {};
      if (!user.profile_picture) updates.profile_picture = pictureUrl;
      if (!user.name) updates.name = name;
      if (Object.keys(updates).length > 0) {
        await db.collection('users').doc(user.id).update(updates);
      }
      await updateUserLoginTime(user.id);
    }

    const token = generateToken(user);
    setAuthCookie(res, token);
    
    res.json({ id: user.id, email: user.email, role: user.role || 'traveler' });
  } catch (error: any) {
    console.error('Google One-Tap error:', error);
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    
    const userDoc = await db.collection('users').doc(user.id).get();
    if (userDoc.exists) {
      const userData: any = userDoc.data();
      return res.json({
        id: user.id,
        email: user.email,
        role: userData.role,
        name: userData.name,
        profileCompleted: userData.profileCompleted ?? false,
        onboardingCompleted: userData.onboardingCompleted ?? false,
        onboardingProgress: userData.onboardingProgress ?? 33,
        activity: userData.activity || [],
        travelerProfile: userData.travelerProfile || null,
        organizationProfile: userData.organizationProfile || null,
        guideProfile: userData.guideProfile || null,
        socialLinks: userData.socialLinks || {
          instagramUsername: null,
          instagramProfileUrl: null,
          isInstagramLinked: false
        }
      });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.id) {
      await db.collection('users').doc(req.user.id).update({ last_logout: new Date().toISOString() });
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

let transporter: nodemailer.Transporter;

const getTransporter = async () => {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Created Ethereal SMTP test account:', testAccount.user);
    } catch (err) {
      console.warn('Failed to create Ethereal SMTP test account, falling back to console logger:', err);
      transporter = {
        sendMail: async (mailOptions: any) => {
          console.log('--- SENT MOCK EMAIL ---');
          console.log('To:', mailOptions.to);
          console.log('Subject:', mailOptions.subject);
          console.log('Body:', mailOptions.text);
          console.log('-----------------------');
          return { messageId: 'mock-id' };
        }
      } as any;
    }
  }
  return transporter;
};

router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user: any = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.authProvider === 'google' || user.google_auth === true) {
      return res.status(400).json({ error: 'This account is linked with Google sign-in. Password recovery is not available.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);
    const resetExpires = Date.now() + 3600 * 1000; // 1 hour from now

    await db.collection('users').doc(user.id).update({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: resetExpires
    });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetLink = `${clientUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    const mailTransporter = await getTransporter();
    const mailOptions = {
      from: '"Adventurer Support" <no-reply@adventurer.com>',
      to: email,
      subject: 'Adventurer - Password Reset Link',
      text: `Hello Adventurer,\n\nYou requested a password reset. Please click on the link below (or copy and paste it into your browser) to reset your password within 1 hour:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nHappy exploring,\nThe Adventurer Team`,
      html: `<p>Hello Adventurer,</p><p>You requested a password reset. Please click on the link below to reset your password within 1 hour:</p><p><a href="${resetLink}" style="padding: 10px 20px; background-color: #1B6630; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a></p><p>Or copy and paste this URL into your browser:</p><p>${resetLink}</p><br/><p>Happy exploring,<br/>The Adventurer Team</p>`
    };

    const info = await mailTransporter.sendMail(mailOptions);

    let previewUrl = '';
    if (info && info.messageId && mailTransporter.options && (mailTransporter.options as any).host === 'smtp.ethereal.email') {
      previewUrl = nodemailer.getTestMessageUrl(info) || '';
      console.log('Preview URL for sent test email:', previewUrl);
    }

    res.json({ 
      message: 'A password reset link has been sent to your email address.',
      ...(previewUrl ? { previewUrl } : {}),
      resetLink,
      resetToken
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { email, token, password } = req.body;
    if (!email || !token || !password) {
      return res.status(400).json({ error: 'Email, token, and password are required' });
    }

    const user: any = await getUserByEmail(email);
    if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
      return res.status(400).json({ error: 'Invalid or expired password reset link' });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: 'Password reset link has expired' });
    }

    const isMatch = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid or expired password reset link' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('users').doc(user.id).update({
      password: hashedPassword,
      resetPasswordToken: admin.firestore.FieldValue.delete(),
      resetPasswordExpires: admin.firestore.FieldValue.delete()
    });

    res.json({ message: 'Your password has been reset successfully.' });
  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
