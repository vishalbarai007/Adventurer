import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('Blogs').get();
    const blogs: any = {};
    snapshot.forEach(doc => {
      blogs[doc.id] = doc.data();
    });
    return res.json(blogs);
  } catch (error: any) {
    console.error(`Error fetching data: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
