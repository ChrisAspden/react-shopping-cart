// backend controller for user authentication
import { Request, Response } from 'express';
import User from '../Models/User';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, passwordHash });

    console.log('✅ Registered new user:', newUser.email);
    return res.status(201).json({ message: 'User created successfully', id: newUser.id });
  } catch (err) {
    console.error('❌ Registration error:', err);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const verifyLoginCredentials = async (req: Request, res: Response) => {
  console.log("🔥 [userRoutes] POST /login hit");
  console.log('✅ Login route hit:', req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('❌ No user found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      console.log('❌ Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`✅ Login successful for user: ${user.email}`);
  
    return res.status(200).json({ success: true, email: user.email });

  } catch (error) {
    console.error('💥 Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

