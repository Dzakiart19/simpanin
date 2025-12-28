import * as functions from 'firebase-functions';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const GIMITA_API = 'https://api.gimita.id/api';

// Enable CORS
app.use(cors({ origin: true }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Simpanin backend is running' });
});

// YouTube MP3
app.get('/downloader/ytmp3', async (req, res) => {
  try {
    const { url } = req.query;
    console.log('YouTube MP3 request:', url);
    const response = await axios.get(`${GIMITA_API}/downloader/ytmp3?url=${encodeURIComponent(String(url))}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('YouTube MP3 error:', error.message);
    res.status(500).json({ error: error.message, success: false });
  }
});

// YouTube MP4
app.get('/downloader/ytmp4', async (req, res) => {
  try {
    const { url, resolution } = req.query;
    console.log('YouTube MP4 request:', url, resolution);
    const response = await axios.get(`${GIMITA_API}/downloader/ytmp4?url=${encodeURIComponent(String(url))}&resolution=${resolution || '720'}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('YouTube MP4 error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// YouTube Info
app.get('/downloader/ytinfo', async (req, res) => {
  try {
    const { url } = req.query;
    console.log('YouTube Info request:', url);
    const response = await axios.get(`${GIMITA_API}/downloader/ytinfo?url=${encodeURIComponent(String(url))}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('YouTube Info error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// TikTok
app.get('/downloader/tiktok', async (req, res) => {
  try {
    const { url } = req.query;
    console.log('TikTok request:', url);
    const response = await axios.get(`${GIMITA_API}/downloader/tiktok?url=${encodeURIComponent(String(url))}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('TikTok error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Spotify
app.get('/downloader/spotify', async (req, res) => {
  try {
    const { url } = req.query;
    console.log('Spotify request:', url);
    const response = await axios.get(`${GIMITA_API}/downloader/spotify?url=${encodeURIComponent(String(url))}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('Spotify error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// XNXX Download
app.get('/downloader/xnxx', async (req, res) => {
  try {
    const { url } = req.query;
    console.log('XNXX download request:', url);
    const response = await axios.get(`${GIMITA_API}/downloader/xnxx?url=${encodeURIComponent(String(url))}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('XNXX error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// XNXX Search
app.get('/search/xnxx', async (req, res) => {
  try {
    const { query, page } = req.query;
    console.log('XNXX search request:', query, page);
    const response = await axios.get(`${GIMITA_API}/search/xnxx?query=${encodeURIComponent(String(query))}&page=${page || 1}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('XNXX search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// PornHub
app.get('/downloader/pornhub', async (req, res) => {
  try {
    const { url } = req.query;
    console.log('PornHub request:', url);
    const response = await axios.get(`${GIMITA_API}/downloader/pornhub?url=${encodeURIComponent(String(url))}`, { 
      timeout: 60000,
      headers: { 'Accept': 'application/json' }
    });
    res.json(response.data);
  } catch (error: any) {
    console.error('PornHub error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Export as Cloud Function
export const api = functions
  .region('us-central1')
  .https.onRequest(app);
