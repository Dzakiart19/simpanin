import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { ResultCard } from "@/components/ui/ResultCard";
import { useToast } from "@/hooks/use-toast";

export default function SpotifyPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Silakan masukkan URL Spotify",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const response = await api.spotify(url);
      console.log('Spotify Response:', response.data);
      
      if (response.data?.success && response.data?.data) {
        const data = response.data.data;
        const metadata = data.metadata || {};
        const download = data.download || {};
        
        setResult({
          title: metadata.title || "Spotify Track",
          thumbnail: metadata.cover || "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
          artist: metadata.artist || "Unknown Artist",
          album: metadata.album || "Unknown Album",
          downloadUrl: download.mp3 || "",
        });
        toast({
          title: "Berhasil",
          description: "Data lagu Spotify berhasil diambil",
        });
      } else {
        throw new Error("Response tidak valid");
      }
    } catch (error: any) {
      console.error('Spotify Error:', error);
      const errorMsg = error.response?.data?.message || error.message || "Gagal mengambil lagu Spotify";
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-600/20">
          <Music className="h-10 w-10 text-green-500" />
        </div>
        
        <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Spotify Downloader
        </h1>
        <p className="mb-10 text-center text-lg text-gray-400">
          Download musik dari Spotify dengan metadata lengkap (artis, cover, album).
        </p>

        <form onSubmit={handleDownload} className="relative w-full max-w-2xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input 
              type="text" 
              placeholder="Contoh: https://open.spotify.com/track/..." 
              className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-green-500 focus:ring-green-500/50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              data-testid="input-spotify-url"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-14 bg-green-600 px-8 text-lg font-bold hover:bg-green-700" 
              disabled={loading}
              data-testid="button-download-spotify"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Download"}
            </Button>
          </div>
        </form>

        {result && (
          <ResultCard 
            title={result.title}
            thumbnail={result.thumbnail}
            author={result.artist}
            url={result.downloadUrl}
            type="audio"
            onDownload={() => window.open(result.downloadUrl, '_blank')}
          />
        )}
      </div>
    </Layout>
  );
}
