import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Import Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import trekRoutes from './routes/trekRoutes';
import postRoutes from './routes/postRoutes';
import paymentRoutes from './routes/paymentRoutes';
import locationRoutes from './routes/locationRoutes';
import blogRoutes from './routes/blogRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import contactRoutes from './routes/contactRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Login server is running" });
});

// Mount Routes
app.use('/', authRoutes); // /register, /login, /me, /logout, /google/*
app.use('/api/user', userRoutes); // /api/user/profile
app.use('/api', trekRoutes); // /api/listings, /api/my-listings
app.use('/api', postRoutes); // /api/posts
app.use('/api', paymentRoutes); // /api/create-order, /api/verify-payment
app.use('/api', locationRoutes); // /api/nearby-spots
app.use('/blog', blogRoutes); // /blog
app.use('/chatbot', chatbotRoutes); // /chatbot
app.use('/contact', contactRoutes); // /contact

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
