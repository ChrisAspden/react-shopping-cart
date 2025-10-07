import { Request, Response } from 'express';
import * as CartService from '../Services/cartService';

export const addToCart = async (req: Request, res: Response) => {
  try {
    console.log('🛒 Raw request body:', req.body);
    const { userId, productId, quantity } = req.body;
    console.log('🛒 Incoming productId:', productId);
    const cartItem = await CartService.addToCart(userId, productId, quantity);
    res.status(200).json(cartItem);
  } catch (err) {
    console.error('❌ Failed to add to cart:', err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const cartItems = await CartService.getCart(userId);
    res.status(200).json(cartItems);
  } catch (err) {
    console.error('❌ Failed to fetch cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const cartItemId = Number(req.params.id);
    const { quantity } = req.body;
    const updatedItem = await CartService.updateCartItem(cartItemId, quantity);
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error('❌ Failed to update cart item:', err);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    console.log('🗑️ removeCartItem fired');
    const cartItemId = Number(req.params.id);
    await CartService.removeCartItem(cartItemId);
    res.status(204).send();
  } catch (err) {
    console.error('❌ Failed to remove cart item:', err);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};
