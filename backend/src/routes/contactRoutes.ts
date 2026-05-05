import { Router, Request, Response } from 'express';
import { db } from '../config/firebase';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    formData.submitted_at = new Date();

    const contactRef = db.collection('contact_submissions');
    await contactRef.add({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
      submitted_at: formData.submitted_at
    });

    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error: any) {
    console.error(`Error saving contact form: ${error}`);
    return res.status(500).json({ error: "Failed to submit form" });
  }
});

export default router;
