#!/bin/bash
# Firebase Cloud Functions Setup Script for Simpanin Backend
# Run this script to deploy backend to Firebase Cloud Functions

echo "🚀 Setting up Firebase Cloud Functions..."

# 1. Create functions directory
mkdir -p functions
cd functions

# 2. Initialize Firebase Functions
firebase init functions --project=simpanin --no-force-config

# 3. Copy backend code to functions folder
cp -r ../server/* ./src/ 2>/dev/null || mkdir -p src

# 4. Create main index file for Cloud Functions
cat > src/index.ts << 'EOF'
import * as functions from 'firebase-functions';
import express from 'express';
import axios from 'axios';

const app = express();
const GIMITA_API = 'https://api.gimita.id/api';

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// YouTube MP3
app.get('/downloader/ytmp3', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(`${GIMITA_API}/downloader/ytmp3?url=${encodeURIComponent(String(url))}`, { timeout: 60000 });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message, success: false });
  }
});

// YouTube MP4
app.get('/downloader/ytmp4', async (req, res) => {
  try {
    const { url, resolution } = req.query;
    const response = await axios.get(`${GIMITA_API}/downloader/ytmp4?url=${encodeURIComponent(String(url))}&resolution=${resolution || '720'}`, { timeout: 60000 });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// TikTok
app.get('/downloader/tiktok', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(`${GIMITA_API}/downloader/tiktok?url=${encodeURIComponent(String(url))}`, { timeout: 60000 });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Spotify
app.get('/downloader/spotify', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(`${GIMITA_API}/downloader/spotify?url=${encodeURIComponent(String(url))}`, { timeout: 60000 });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// XNXX
app.get('/downloader/xnxx', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(`${GIMITA_API}/downloader/xnxx?url=${encodeURIComponent(String(url))}`, { timeout: 60000 });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PornHub
app.get('/downloader/pornhub', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(`${GIMITA_API}/downloader/pornhub?url=${encodeURIComponent(String(url))}`, { timeout: 60000 });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Export as Cloud Function
export const api = functions.https.onRequest(app);
EOF

# 5. Update package.json for functions
cat > package.json << 'EOF'
{
  "name": "simpanin-functions",
  "description": "Cloud Functions for Simpanin backend",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "20"
  },
  "dependencies": {
    "firebase-functions": "^6.0.0",
    "express": "^4.21.2",
    "axios": "^1.13.2"
  }
}
EOF

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. cd functions"
echo "2. npm install"
echo "3. firebase deploy --only functions"
echo ""
echo "After deploy, update frontend API_BASE_URL with the function URL"
