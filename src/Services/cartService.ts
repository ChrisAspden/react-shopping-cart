import { models } from '../Models/Models';
const { CartItem, Product } = models;

import { Op } from 'sequelize';

export async function addToCart(userId: number, productId: number, quantity: number) {
  // Check if item already exists in cart
  const existingItem = await CartItem.findOne({
    where: { userId, productId },
  });

  if (existingItem) {
    // Update quantity
    existingItem.quantity += quantity;
    await existingItem.save();
    return existingItem;
  }

  // Get product price snapshot
  type ProductInstance = InstanceType<typeof Product>;
  const product = await Product.findByPk(productId) as ProductInstance;
  console.log('🔍 Product lookup result:', product);
  if (!product || isNaN(Number(product.price))) {
  throw new Error('Product not found or price is invalid');
  }

  const newItem = await CartItem.create({
    userId,
    productId,
    quantity,
    price: Number(product.price),
  });

  return newItem;
}

export async function getCart(userId: number) {
  return await CartItem.findAll({
    where: { userId },
    include: [Product],
  });
}

export async function updateCartItem(cartItemId: number, quantity: number) {
  const item = await CartItem.findByPk(cartItemId);
  if (!item) throw new Error('Cart item not found');

  item.quantity = quantity;
  await item.save();
  return item;
}

export async function removeCartItem(cartItemId: number) {
  console.log('🗑️ removeCartItem fired');
  await CartItem.destroy({
    where: { id: cartItemId },
  });
}
