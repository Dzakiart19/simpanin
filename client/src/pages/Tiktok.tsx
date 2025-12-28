import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Video, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { ResultCard } from "@/components/ui/ResultCard";
import { useToast } from "@/hooks/use-toast";

export default function TiktokPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Silakan masukkan URL TikTok",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setResult(null);

    try {
      const response = await api.tiktok(url);
      console.log('TikTok Response:', response.data);
      
      if (response.data?.success && response.data?.data) {
        const data = response.data.data;
        const authorName = data.author?.name || "TikTok User";
        const videoUrl = data.video?.hd || data.video?.sd || "";
        
        setResult({
          title: data.title || "TikTok Video",
          thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
          author: authorName,
          stats: data.stats || {},
          downloadUrl: videoUrl,
          views: data.stats?.views || 0,
        });
        toast({
          title: "Berhasil ✓",
          description: "Video TikTok siap didownload tanpa watermark",
        });
      } else {
        throw new Error("Response tidak valid: " + JSON.stringify(response.data));
      }
    } catch (error: any) {
      console.error('TikTok Error:', error);
      const errorMsg = error.response?.data?.message || error.message || "Gagal mengambil video TikTok. Periksa URL Anda.";
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
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-pink-600/20">
          <Video className="h-10 w-10 text-pink-500" />
        </div>
        
        <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          TikTok Downloader
        </h1>
        <p className="mb-10 text-center text-lg text-gray-400">
          Download video TikTok tanpa watermark dalam kualitas tinggi (HD).
        </p>

        <form onSubmit={handleDownload} className="relative w-full max-w-2xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input 
              type="text" 
              placeholder="Contoh: https://vt.tiktok.com/ZS5ds6PUw/" 
              className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-pink-500 focus:ring-pink-500/50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              data-testid="input-tiktok-url"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-14 bg-pink-600 px-8 text-lg font-bold hover:bg-pink-700" 
              disabled={loading}
              data-testid="button-download-tiktok"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Download"}
            </Button>
          </div>
        </form>

        {result && (
          <ResultCard 
            title={result.title}
            thumbnail={result.thumbnail}
            author={result.author}
            url={result.downloadUrl}
            type="video"
            onDownload={() => window.open(result.downloadUrl, '_blank')}
          />
        )}
      </div>
    </Layout>
  );
}
