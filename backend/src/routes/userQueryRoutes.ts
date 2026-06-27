import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';

const router = Router();

// POST /api/user-query - Submit a user query from the footer contact form
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, location, contact, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const queryData = {
      name: name.trim(),
      email: email.trim(),
      location: location?.trim() || '',
      contact: contact?.trim() || '',
      message: message.trim(),
      status: 'unread',
      submitted_at: new Date().toISOString(),
      created_at: new Date(),
    };

    const docRef = await db.collection('user_queries').add(queryData);

    return res.status(201).json({
      message: 'Query submitted successfully',
      id: docRef.id,
    });
  } catch (error: any) {
    console.error(`Error saving user query: ${error}`);
    return res.status(500).json({ error: 'Failed to submit query. Please try again.' });
  }
});

// GET /api/user-query - Retrieve all user queries (for admin purposes)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('user_queries')
      .orderBy('created_at', 'desc')
      .get();

    const queries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(queries);
  } catch (error: any) {
    console.error(`Error fetching user queries: ${error}`);
    return res.status(500).json({ error: 'Failed to fetch queries.' });
  }
});

export default router;
