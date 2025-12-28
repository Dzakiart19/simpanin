import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { api } from "@/lib/api";
import { ResultCard } from "@/components/ui/ResultCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function AdultPage() {
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await api.xnxx.download(url);
      if (response.data?.success && response.data?.data) {
        const data = response.data.data;
        setResult({
          title: data.title || "Video",
          thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&q=80",
          author: data.uploader || "Unknown",
          downloadUrl: data.video_url_high || data.video_url_low || "", 
        });
        toast({
          title: "Berhasil",
          description: "Data video berhasil diambil",
        });
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Gagal mengambil video. Periksa URL Anda.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    setSearchResults([]);
    setSelectedResult(null);

    try {
      const response = await api.xnxx.search(searchQuery, 1);
      if (response.data?.success && response.data?.data && Array.isArray(response.data.data)) {
        setSearchResults(response.data.data);
        toast({
          title: "Berhasil",
          description: `Menemukan ${response.data.data.length} hasil`,
        });
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Pencarian gagal.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromSearch = (item: any) => {
    setSelectedResult({
      title: item.title || "Video",
      thumbnail: item.thumbnail || "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&q=80",
      author: "Unknown",
      downloadUrl: item.link || "",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-600/20">
          <AlertCircle className="h-10 w-10 text-yellow-500" />
        </div>
        
        <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          18+ Downloader
        </h1>
        <p className="mb-10 text-center text-lg text-gray-400">
          Download video pribadi dan pencarian (XNXX, PornHub).
        </p>

        <Tabs defaultValue="downloader" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-2 bg-black/50" data-testid="tabs-adult">
            <TabsTrigger value="downloader">Downloader</TabsTrigger>
            <TabsTrigger value="search">Pencarian</TabsTrigger>
          </TabsList>
          
          <TabsContent value="downloader" className="mt-6">
            <form onSubmit={handleDownload} className="relative w-full">
              <div className="flex flex-col gap-4 md:flex-row">
                <Input 
                  type="text" 
                  placeholder="Paste URL (XNXX, PornHub)..." 
                  className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-yellow-500 focus:ring-yellow-500/50"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  data-testid="input-adult-url"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 bg-yellow-600 px-8 text-lg font-bold hover:bg-yellow-700" 
                  disabled={loading}
                  data-testid="button-download-adult"
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
          </TabsContent>
          
          <TabsContent value="search" className="mt-6">
            <form onSubmit={handleSearch} className="relative w-full mb-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <Input 
                  type="text" 
                  placeholder="Cari video..." 
                  className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-yellow-500 focus:ring-yellow-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-query"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 bg-yellow-600 px-8 text-lg font-bold hover:bg-yellow-700" 
                  disabled={loading}
                  data-testid="button-search-adult"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Search />}
                </Button>
              </div>
            </form>

            {searchResults.length > 0 && (
              <div className="grid gap-4 mb-6">
                {searchResults.map((item, idx) => (
                  <Card 
                    key={idx} 
                    className="overflow-hidden border-white/10 bg-[#181818] hover:bg-[#202020] transition-colors cursor-pointer"
                    onClick={() => handleSelectFromSearch(item)}
                    data-testid={`search-result-${idx}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-24 h-24 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-white line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-gray-400 mt-2">Klik untuk download</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {selectedResult && (
              <ResultCard 
                title={selectedResult.title}
                thumbnail={selectedResult.thumbnail}
                author={selectedResult.author}
                url={selectedResult.downloadUrl}
                type="video"
                onDownload={() => window.open(selectedResult.downloadUrl, '_blank')}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
