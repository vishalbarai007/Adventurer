import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/firebase';

const JWT_SECRET = process.env.SECRET_KEY || 'default_secret_key';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    // Implement sliding session window
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role || 'traveler' },
      JWT_SECRET,
      { expiresIn: '3d' }
    );
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: No user found' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }
    next();
  };
};
