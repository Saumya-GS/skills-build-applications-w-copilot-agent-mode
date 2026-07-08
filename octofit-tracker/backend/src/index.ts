import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Octofit API is running' });
});

import apiRoutes from './routes/index.js';

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Octofit API server running on port ${PORT}`);
      console.log(`📚 Base URL: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server due to database connection error');
    process.exit(1);
  });
