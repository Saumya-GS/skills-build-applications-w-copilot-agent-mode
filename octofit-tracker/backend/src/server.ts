import 'dotenv/config';
import app from './index.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 8000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Octofit API server running on port ${PORT}`);
      console.log(`📚 Base URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error');
    process.exit(1);
  }
}

start();
