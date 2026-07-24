import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import trekRoutes from './routes/trekRoutes';
import postRoutes from './routes/postRoutes';
import paymentRoutes from './routes/paymentRoutes';
import locationRoutes from './routes/locationRoutes';
import blogRoutes from './routes/blogRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import contactRoutes from './routes/contactRoutes';
import uploadRoutes from './routes/uploadRoutes';
import userQueryRoutes from './routes/userQueryRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow both production Vercel URL and local Vite server
app.use(cors({ 
  origin: [CLIENT_URL, 'http://localhost:5173', 'https://neo-adventurer.vercel.app'], 
  credentials: true 
}));

app.get('/', (req, res) => {
  res.status(200).json({ message: "Login server is running" });
});

app.use('/', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', trekRoutes);
app.use('/api', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', paymentRoutes);
app.use('/api', locationRoutes);
app.use('/blog', blogRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/contact', contactRoutes);
app.use('/api/user-query', userQueryRoutes);
app.use('/api', marketplaceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});