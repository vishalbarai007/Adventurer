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
  // Frontend sends the secure_url returned by Cloudinary
  const { secure_url, mediaUrl, public_id, userId, locationName, locationTag, description, caption, authorName, locationCoords } = req.body;

  const finalImageUrl = secure_url || mediaUrl;

  if (!finalImageUrl) {
    return res.status(400).json({ error: "No image URL provided" });
  }

  try {
    const postRef = db.collection('posts').doc();
    const postData = {
      postId: postRef.id,
      imageUrl: finalImageUrl, 
      mediaUrl: finalImageUrl, // Keeping for backward compatibility
      public_id: public_id || null, // Storing public_id for future deletion
      userId: req.user?.id || userId || "anonymous",
      authorId: req.user?.id || userId || "anonymous",
      authorName: authorName || "Adventurer",
      locationName: locationName || locationTag || "",
      locationTag: locationTag || locationName || "",
      description: description || caption || "",
      caption: caption || description || "",
      locationCoords: locationCoords || {},
      likes: [],
      createdAt: new Date(),
    };
    
    await postRef.set(postData);

    return res.status(201).json({ 
      id: postRef.id, 
      postId: postRef.id,
      message: "Post created successfully!",
      post: postData
    });
  } catch (error: any) {
    console.error(`Error saving post: ${error}`);
    return res.status(500).json({ error: "Failed to save post to database" });
  }
});

export default router;
