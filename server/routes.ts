import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { log } from "./index";

const GIMITA_API = 'https://api.gimita.id/api';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API Proxy routes untuk resolve CORS issue
  
  // YouTube routes
  app.get('/api/downloader/ytmp3', async (req: Request, res: Response) => {
    try {
      const { url } = req.query;
      log(`API Call: YouTube MP3 - ${url}`);
      const response = await axios.get(`${GIMITA_API}/downloader/ytmp3?url=${encodeURIComponent(String(url))}`, {
        timeout: 60000,
        headers: { 'Accept': 'application/json' }
      });
      return res.json(response.data);
    } catch (error: any) {
      log(`API Error: YouTube MP3 - ${error.message}`);
      return res.status(500).json({ error: error.message, success: false });
    }
  });

  app.get('/api/downloader/ytmp4', async (req, res) => {
    try {
      const { url, resolution } = req.query;
      const response = await axios.get(`${GIMITA_API}/downloader/ytmp4?url=${encodeURIComponent(String(url))}&resolution=${resolution || '720'}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/downloader/ytinfo', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await axios.get(`${GIMITA_API}/downloader/ytinfo?url=${encodeURIComponent(String(url))}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // TikTok route
  app.get('/api/downloader/tiktok', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await axios.get(`${GIMITA_API}/downloader/tiktok?url=${encodeURIComponent(String(url))}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Spotify route
  app.get('/api/downloader/spotify', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await axios.get(`${GIMITA_API}/downloader/spotify?url=${encodeURIComponent(String(url))}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // XNXX routes
  app.get('/api/downloader/xnxx', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await axios.get(`${GIMITA_API}/downloader/xnxx?url=${encodeURIComponent(String(url))}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/search/xnxx', async (req, res) => {
    try {
      const { query, page } = req.query;
      const response = await axios.get(`${GIMITA_API}/search/xnxx?query=${encodeURIComponent(String(query))}&page=${page || 1}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // PornHub route
  app.get('/api/downloader/pornhub', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await axios.get(`${GIMITA_API}/downloader/pornhub?url=${encodeURIComponent(String(url))}`, {
        timeout: 60000
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
