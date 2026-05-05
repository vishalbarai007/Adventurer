import { Router, Request, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';
import Razorpay from 'razorpay';

const router = Router();

// We keep dummy keys to match python code
const razorpayClient = new Razorpay({
  key_id: "rzp_test_dummy_key",
  key_secret: "dummy_secret"
});

router.post('/create-order', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const amount = parseFloat(data.price || 0);
    // Calculate 1% platform fee
    const platformFee = amount * 0.01;
    const organizerShare = amount - platformFee;
    
    const amountInPaise = Math.round(amount * 100);
    
    // Mock order since we are using dummy keys
    const mockOrder = {
      id: "order_mock_" + Math.floor(Date.now() / 1000).toString(),
      amount: amountInPaise,
      currency: "INR",
      fee: platformFee,
      organizer_share: organizerShare
    };
    
    return res.status(200).json(mockOrder);
  } catch (error: any) {
    console.error(`Razorpay Error: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

router.post('/verify-payment', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const transactionId = data.transactionId || ('txn_mock_' + Math.floor(Date.now() / 1000).toString());
    const amount = parseFloat(data.amount || 0);
    const paymentMode = data.paymentMode || 'Online';
    const organizerId = data.organizerId || 'mock_organizer_id';
    const userId = req.user?.id || 'mock_user_id';
    const percentagePaid = data.percentagePaid !== undefined ? data.percentagePaid : (paymentMode === 'Online' ? 100 : 0);
    
    const platformFee = amount * 0.01;
    
    const bookingRef = db.collection('bookings').doc();
    const bookingData = {
      bookingId: bookingRef.id,
      transactionId,
      amount,
      platformFee,
      escrowStatus: paymentMode === 'Cash' ? "Pending_Cash" : "Held",
      paymentMode,
      percentagePaid,
      userId,
      organizerId,
      createdAt: new Date()
    };
    
    await bookingRef.set(bookingData);
    return res.status(200).json({ success: true, bookingId: bookingRef.id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
