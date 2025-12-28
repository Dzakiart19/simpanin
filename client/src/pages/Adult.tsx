import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { api } from "@/lib/api";
import { ResultCard } from "@/components/ui/ResultCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdultPage() {
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await api.xnxx.download(url);
       if (response.data) {
           setResult({
            title: response.data.title || "Video",
            thumbnail: response.data.thumbnail || "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&q=80",
            author: "Unknown",
            url: response.data.download_url || response.data.url, 
          });
      }
    } catch (error) {
       toast({
        title: "Error",
        description: "Failed to fetch video.",
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

    try {
      const response = await api.xnxx.search(searchQuery);
      // Mocking search results if API structure is unknown
      if (response.data && Array.isArray(response.data)) {
          setSearchResults(response.data);
      }
    } catch (error) {
      toast({
         title: "Error",
         description: "Search failed.",
         variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

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
          Private video downloader and search.
        </p>

        <Tabs defaultValue="downloader" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-2 bg-black/50">
            <TabsTrigger value="downloader">Downloader</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
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
                />
                <Button type="submit" size="lg" className="h-14 bg-yellow-600 px-8 text-lg font-bold hover:bg-yellow-700" disabled={loading}>
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
                type="video"
                onDownload={() => {}}
              />
            )}
          </TabsContent>
          
          <TabsContent value="search" className="mt-6">
             <form onSubmit={handleSearch} className="relative w-full">
              <div className="flex flex-col gap-4 md:flex-row">
                <Input 
                  type="text" 
                  placeholder="Search videos..." 
                  className="h-14 border-white/10 bg-black/50 px-6 text-lg text-white backdrop-blur-md focus:border-yellow-500 focus:ring-yellow-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="lg" className="h-14 bg-yellow-600 px-8 text-lg font-bold hover:bg-yellow-700" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : <Search />}
                </Button>
              </div>
            </form>
            {/* Search results would go here - simplified for mockup */}
            {searchResults.length > 0 && (
                <div className="mt-8 text-center text-gray-400">
                    Search results display not fully implemented in this mockup view.
                </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
