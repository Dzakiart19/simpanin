import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Youtube, Search, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { ResultCard } from "@/components/ui/ResultCard";
import { useToast } from "@/hooks/use-toast";

export default function YoutubePage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);

    try {
      // First get info for better UI, or directly download based on format
      let response;
      if (format === 'mp3') {
        response = await api.youtube.mp3(url);
      } else {
        response = await api.youtube.mp4(url);
      }
      
      console.log(response.data);

      if (response.data) {
          // Mocking the structure based on typical API responses if raw data is complex
          // Adjust based on actual Gimita API response structure
          setResult({
            title: response.data.title || "YouTube Video",
            thumbnail: response.data.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
            author: response.data.author || "Unknown Channel",
            url: response.data.download_url || response.data.url, // Adjust based on API
          });
      } else {
        throw new Error("No data returned");
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch video. Please check the URL.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-600/20">
          <Youtube className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          YouTube Downloader
        </h1>
        <p className="mb-10 text-center text-lg text-gray-400">
          Convert and download YouTube videos in MP4 or MP3 format high quality.
        </p>

        <form onSubmit={handleDownload} className="relative w-full max-w-2xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <Input 
              type="text" 
              placeholder="Paste YouTube URL here..." 
              className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-red-600 focus:ring-red-600/50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            
            <div className="flex gap-2">
               <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="h-14 w-32 border-white/10 bg-black/50 text-white backdrop-blur-md">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4</SelectItem>
                  <SelectItem value="mp3">MP3</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" size="lg" className="h-14 bg-red-600 px-8 text-lg font-bold hover:bg-red-700" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Start"}
              </Button>
            </div>
          </div>
        </form>

        {result && (
          <ResultCard 
            title={result.title}
            thumbnail={result.thumbnail}
            author={result.author}
            url={result.url}
            type={format === 'mp3' ? 'audio' : 'video'}
            onDownload={() => {}}
          />
        )}
      </div>
    </Layout>
  );
}
