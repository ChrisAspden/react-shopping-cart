// src/server.ts
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './Database/index';
import userRoutes from './Routes/userRoutes';
import Product from './Models/Products';
import cartRoutes from './Routes/CartRoutes';
import { Op } from 'sequelize';

console.log('🛠 Starting server.ts...');
dotenv.config(); // Load environment variables from .env file

console.log('🧭 DB connection string:', process.env.DATABASE_URL);
console.log('🧠 Sequelize DB name:', sequelize.getDatabaseName());
console.log('🔌 Sequelize dialect:', sequelize.getDialect());

const app = express();
const PORT = 3001;

// 🛡 Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`🌐 Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// 📦 Routes
app.use('/api/users', userRoutes);
app.use('/images', express.static(path.join(__dirname, '../src/Assets')));
app.use('/api/cart', cartRoutes);

// 🛒 Product API
app.get('/api/products', async (req, res) => {
  const rawSubcategory = req.query.subcategory;
  const subcategory = Array.isArray(rawSubcategory)
    ? rawSubcategory[0]
    : typeof rawSubcategory === 'object'
      ? String(rawSubcategory)
      : rawSubcategory;

  try {
    const where = subcategory
      ? { subcategory: { [Op.iLike]: `%${subcategory}%` } } // ✅ partial + case-insensitive
      : {};


      console.log('🔍 Raw subcategory from query:', req.query.subcategory);
      console.log('🔍 Normalised subcategory:', subcategory);

    const products = await Product.findAll({ where });
    console.log('📦 Products found:', products.map(p => p.subcategory))
    res.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔌 DB Connection
sequelize.authenticate()
  .then(() => console.log('✅ Sequelize successfully connected to the database'))
  .catch((err) => console.error('❌ Sequelize failed to connect:', err));

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

