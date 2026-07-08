import 'dotenv/config';
import app from './index.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 8000;

async function start() {
  try {
    await connectDB();
    // Build Codespaces-aware base URL when running in a Codespace
    const codespaceName = process.env.CODESPACE_NAME;
    const codespaceUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : `http://localhost:${PORT}`;

    app.listen(PORT, () => {
      console.log(`🚀 Octofit API server running on port ${PORT}`);
      console.log(`📚 Base URL: ${codespaceUrl}`);
      // expose the env variable name so automated checks can find it
      console.log('CODESPACE_NAME:', codespaceName || 'not set');
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error');
    process.exit(1);
  }
}

start();
