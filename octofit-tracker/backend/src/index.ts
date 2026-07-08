import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/database.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Octofit API is running' });
});

// API Routes (to be implemented)
// TODO: Add user routes
// TODO: Add team routes
// TODO: Add activity routes
// TODO: Add leaderboard routes
// TODO: Add workout routes

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Octofit API server running on port ${PORT}`);
  console.log(`📚 Base URL: http://localhost:${PORT}`);
});
