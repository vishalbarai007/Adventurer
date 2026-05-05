import { Router, Request, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';

const router = Router();

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts: any[] = [];
    snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(posts);
  } catch (error: any) {
    console.error(`Error fetching posts: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

router.post('/posts', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const postRef = db.collection('posts').doc();
    const postData = {
      postId: postRef.id,
      authorId: data.authorId || req.user?.id || "anonymous",
      authorName: data.authorName || "Adventurer",
      mediaUrl: data.mediaUrl || "",
      caption: data.caption || "",
      locationTag: data.locationTag || "",
      locationCoords: data.locationCoords || {},
      likes: [],
      createdAt: new Date()
    };
    
    await postRef.set(postData);
    return res.status(201).json(postData);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
