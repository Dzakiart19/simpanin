import axios from 'axios';

const API_BASE_URL = 'https://api.gimita.id/api';

export interface DownloadResponse {
  status: boolean;
  message: string;
  data: any; // Dynamic based on endpoint
}

export const api = {
  youtube: {
    mp3: (url: string) => axios.get(`${API_BASE_URL}/downloader/ytmp3?url=${encodeURIComponent(url)}`),
    mp4: (url: string, resolution: string = '720') => axios.get(`${API_BASE_URL}/downloader/ytmp4?url=${encodeURIComponent(url)}&resolution=${resolution}`),
    info: (url: string) => axios.get(`${API_BASE_URL}/downloader/ytinfo?url=${encodeURIComponent(url)}`),
  },
  tiktok: (url: string) => axios.get(`${API_BASE_URL}/downloader/tiktok?url=${encodeURIComponent(url)}`),
  spotify: (url: string) => axios.get(`${API_BASE_URL}/downloader/spotify?url=${encodeURIComponent(url)}`),
  xnxx: {
    download: (url: string) => axios.get(`${API_BASE_URL}/downloader/xnxx?url=${encodeURIComponent(url)}`),
    search: (query: string, page: number = 1) => axios.get(`${API_BASE_URL}/search/xnxx?query=${encodeURIComponent(query)}&page=${page}`),
  },
  pornhub: (url: string) => axios.get(`${API_BASE_URL}/downloader/pornhub?url=${encodeURIComponent(url)}`),
};
