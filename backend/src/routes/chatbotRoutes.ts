import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../config/firebase';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const userInput = req.body.message;
  if (!userInput) {
    return res.status(400).json({ error: "No input provided" });
  }

  try {
    // 1. Fetch available trips/listings from Firestore for context
    const snapshot = await db.collection('listings').limit(5).get();
    let listingsData = "";
    
    snapshot.forEach(doc => {
      const d: any = doc.data();
      const location = d.location || {};
      const address = location.address || 'Various Locations';
      listingsData += `- ${d.title || 'Trek'} at ${address} for ₹${d.price || 'TBD'}\n`;
    });

    // 2. Construct the "System Prompt"
    const systemPrompt = `
      You are the Adventurer Concierge, a helpful assistant for a trekking and travel platform. 
      Here are some of our current featured trips:
      ${listingsData}
      
      Guidelines:
      - Use this info to help the user find their next adventure. 
      - If they show interest in a specific type of trip or listing, encourage them to 'Check the Explore Feed' for more details.
      - Be witty, adventurous, and concise.
      - If you don't know something, be honest but stay in character.
    `;

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([systemPrompt, userInput]);
    const botReply = result.response.text() || "I'm having a bit of trouble connecting to the base camp. Could you try that again?";

    return res.json({ response: botReply });
  } catch (error: any) {
    console.error(`Chatbot error: ${error}`);
    return res.status(500).json({ error: "AI service error" });
  }
});

export default router;
