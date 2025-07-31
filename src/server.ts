// src/server.ts
console.log("🛠 Starting server.ts...");

import cors from 'cors';
import express from 'express';
import sequelize from './Database/index'; // adjust if your path is different
import userRoutes from './Routes/userRoutes';

import authRoutes from './Routes/authRoutes';


const app = express();
const PORT = 3001;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // if you're using cookies or sessions
}));

app.use(express.json());
// 🔍 Log every incoming request, no matter the route or method
app.use((req, res, next) => {
  console.log(`🌐 Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Sync database and start server
sequelize.sync()
  .then(() => console.log('Synced with postgres DB!'))
  .catch(err => console.error('Sync failed:', err));

  app.get('/test', (_, res) => {
  console.log('🧪 /test route hit');
  res.send('Hello from backend');
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
