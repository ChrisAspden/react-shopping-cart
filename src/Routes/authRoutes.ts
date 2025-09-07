// src/Routes/authRoutes.ts
//backend routes/logic for user authentication
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../Models/User'; // adjust if needed

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ success: true, email: user.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
