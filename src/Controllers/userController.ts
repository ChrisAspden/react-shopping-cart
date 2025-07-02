import { Request, Response } from 'express';
import  User from '../Models/User';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Create user with plain password (hashing handled in model)
    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User created successfully', id: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // In real apps: generate a JWT or session token here
    res.json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login.' });
  }
};