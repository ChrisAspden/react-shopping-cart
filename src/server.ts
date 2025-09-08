// src/server.ts
console.log("🛠 Starting server.ts...");
console.log("🔁 Nodemon reload test — if you see this, hot reload works!");

import cors from 'cors';
import express from 'express';
import sequelize from './Database/index'; // adjust if your path is different
import userRoutes from './Routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

console.log("🛠 Starting server.ts...");
console.log("🧭 DB connection string:", process.env.DATABASE_URL);
console.log("🧠 Sequelize DB name:", sequelize.getDatabaseName());
console.log("🔌 Sequelize dialect:", sequelize.getDialect());

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

// Sync database and start server
sequelize.sync()
  .then(() => console.log('Synced with postgres DB!'))
  .catch(err => console.error('Sync failed:', err));

  app.get('/test', (_, res) => {
  console.log('🧪 /test route hit');
  res.send('Hello from backend');
  });

  sequelize.authenticate()
  .then(() => console.log('✅ Sequelize successfully connected to the database'))
  .catch((err) => console.error('❌ Sequelize failed to connect:', err));


  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
