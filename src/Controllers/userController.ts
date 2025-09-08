// // backend controller for user authentication
import { Request, Response } from 'express';
import User from '../Models/User';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendConfirmationEmail } from '../Services/emailService';
import { sendPasswordResetEmail } from '../Services/emailService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('⚠️ Duplicate email attempt:', email);
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');
    const newUser = await User.create({
      email,
      passwordHash,
      confirmationToken: token,
      confirmed: false
    });

    await sendConfirmationEmail(email, token);


    console.log('✅ Registered new user:', newUser.email);
    return res.status(201).json({ message: 'User created successfully', id: newUser.id });
  } catch (err) {
    console.error('❌ Registration error:', err);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const verifyLoginCredentials = async (req: Request, res: Response) => {
  console.log('🔥 [userRoutes] POST /login hit');
  const { email, password } = req.body;
  console.log('📨 Login attempt:', email);

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'passwordHash', 'confirmed'],
      logging: console.log,
    });

    if (!user) {
      console.log('❌ No user found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.confirmed) {
      console.log('🚫 Unconfirmed user login attempt:', email);
      return res.status(403).json({ message: 'Please confirm your email before logging in' });
    }

    console.log(`✅ Login successful for user: ${user.email}`);
    return res.status(200).json({ success: true, email: user.email });
  } catch (error) {
    console.error('💥 Login error:', error);
    return res.status(500).json({ message: 'Server error during login.' });
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  const {token} = req.body;

  if(!token || typeof token !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid token' });
  }

  try{
    const user = await User.findOne({ where: { confirmationToken: token } });

    if (!user){
      return res.status(400).json({ message: 'Invalid or expired confirmation token' });
    }

    user.confirmed = true;
    user.confirmationToken = null;
    await user.save();
  }
  catch (err) {
    console.error('Email confirmation error:', err);
    return res.status(500).json({ message: 'Server error during confirmation.' });
  }
}


export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('⚠️ Password reset requested for non-existent email:', email);
      return res.status(404).json({ message: 'No account found with that email.' });
    }

    const token = crypto.randomUUID();
    user.resetToken = token;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    return res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('❌ Error sending password reset email:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


export const resetPassword = async (req: Request, res: Response) => {
  console.log('🔐 Reset password endpoint hit');
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user) {
      console.log('⚠️ Invalid reset token:', token);
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    user.resetToken = null;
    await user.save();

    console.log('✅ Password updated for:', user.email);
    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('❌ Error resetting password:', err);
    return res.status(500).json({ message: 'Server error during password reset.' });
  }
};




