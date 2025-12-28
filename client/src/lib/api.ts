import axios from 'axios';

// Use local backend instead of external API (resolve CORS)
const API_BASE_URL = '/api';

export interface DownloadResponse {
  status: boolean;
  message: string;
  data: any;
}

// Buat axios instance dengan timeout lebih lama untuk API yang slow
const apiClient = axios.create({
  timeout: 60000, // 60 detik timeout
  headers: {
    'Accept': 'application/json',
  }
});

// Interceptor untuk error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    console.error('Error Details:', error.response?.data || error.message);
    throw error;
  }
);

export const api = {
  youtube: {
    mp3: (url: string) => {
      console.log('Fetching YouTube MP3:', url);
      return apiClient.get(`${API_BASE_URL}/downloader/ytmp3?url=${encodeURIComponent(url)}`);
    },
    mp4: (url: string, resolution: string = '720') => {
      console.log('Fetching YouTube MP4:', url, 'Resolution:', resolution);
      return apiClient.get(`${API_BASE_URL}/downloader/ytmp4?url=${encodeURIComponent(url)}&resolution=${resolution}`);
    },
    info: (url: string) => {
      console.log('Fetching YouTube Info:', url);
      return apiClient.get(`${API_BASE_URL}/downloader/ytinfo?url=${encodeURIComponent(url)}`);
    },
  },
  tiktok: (url: string) => {
    console.log('Fetching TikTok:', url);
    return apiClient.get(`${API_BASE_URL}/downloader/tiktok?url=${encodeURIComponent(url)}`);
  },
  instagram: (url: string) => {
    console.log('Fetching Instagram:', url);
    return apiClient.get(`${API_BASE_URL}/downloader/instagram?url=${encodeURIComponent(url)}`);
  },
  spotify: (url: string) => {
    console.log('Fetching Spotify:', url);
    return apiClient.get(`${API_BASE_URL}/downloader/spotify?url=${encodeURIComponent(url)}`);
  },
  xnxx: {
    download: (url: string) => {
      console.log('Fetching XNXX:', url);
      return apiClient.get(`${API_BASE_URL}/downloader/xnxx?url=${encodeURIComponent(url)}`);
    },
    search: (query: string, page: number = 1) => {
      console.log('Searching XNXX:', query, 'Page:', page);
      return apiClient.get(`${API_BASE_URL}/search/xnxx?query=${encodeURIComponent(query)}&page=${page}`);
    },
  },
  pornhub: (url: string) => {
    console.log('Fetching PornHub:', url);
    return apiClient.get(`${API_BASE_URL}/downloader/pornhub?url=${encodeURIComponent(url)}`);
  },
};
