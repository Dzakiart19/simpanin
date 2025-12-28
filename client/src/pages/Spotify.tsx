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
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await api.spotify(url);
      
      if (response.data) {
           setResult({
            title: response.data.title || "Spotify Track",
            thumbnail: response.data.thumbnail || "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
            author: response.data.artist || "Artist",
            url: response.data.download_url || response.data.url, 
          });
      }
    } catch (error) {
       toast({
        title: "Error",
        description: "Failed to fetch Spotify track.",
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
          Download music from Spotify with metadata included.
        </p>

        <form onSubmit={handleDownload} className="relative w-full max-w-2xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input 
              type="text" 
              placeholder="Paste Spotify URL here..." 
              className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-green-500 focus:ring-green-500/50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" size="lg" className="h-14 bg-green-600 px-8 text-lg font-bold hover:bg-green-700" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Download"}
            </Button>
          </div>
        </form>

        {result && (
          <ResultCard 
            title={result.title}
            thumbnail={result.thumbnail}
            author={result.author}
            url={result.url}
            type="audio"
            onDownload={() => {}}
          />
        )}
      </div>
    </Layout>
  );
}
