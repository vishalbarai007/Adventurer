import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('Blogs').get();
    const blogs: any = {};
    snapshot.forEach(doc => {
      blogs[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });
    return res.json(blogs);
  } catch (error: any) {
    console.error(`Error fetching data: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

// POST /blog/:id/comment - Add a comment to a specific blog post
router.post('/:id/comment', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { name, text } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required fields.' });
    }

    const blogRef = db.collection('Blogs').doc(id);
    const doc = await blogRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const blogData = doc.data();
    const comments = blogData?.comments || [];

    const newComment = {
      id: db.collection('Blogs').doc().id, // Generate a unique id for the comment
      name: name.trim(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    comments.push(newComment);

    await blogRef.update({ comments });

    return res.status(201).json(newComment);
  } catch (error: any) {
    console.error(`Error saving comment: ${error}`);
    return res.status(500).json({ error: 'Failed to add comment. Please try again.' });
  }
});

export default router;
