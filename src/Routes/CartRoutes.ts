//backend
import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from '../Controllers/CartController';

const router = express.Router();
router.post('/add', addToCart);
router.get('/:userId', getCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

export default router;
