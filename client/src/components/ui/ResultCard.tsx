import { motion } from "framer-motion";
import { Download, Music, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  thumbnail: string;
  title: string;
  author?: string;
  duration?: string;
  url?: string;
  type?: 'video' | 'audio';
  onDownload: () => void;
}

export function ResultCard({ thumbnail, title, author, duration, url, type = 'video', onDownload }: ResultCardProps) {
  const handleDownloadClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
    onDownload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-10 w-full max-w-4xl"
    >
      <Card className="overflow-hidden border-white/10 bg-[#181818] hover:bg-[#202020] transition-colors" data-testid="card-result">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail Section */}
            <div className="relative md:w-2/5 aspect-video md:aspect-auto group overflow-hidden">
              <img 
                src={thumbnail} 
                alt={title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-testid="img-result-thumbnail"
              />
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between p-6 md:w-3/5">
              <div>
                <h3 className="mb-2 text-2xl font-bold leading-tight text-white line-clamp-2" data-testid="text-result-title">
                  {title}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  {author && (
                    <div className="flex items-center gap-2" data-testid="text-result-author">
                      <span>{author}</span>
                    </div>
                  )}
                  {duration && (
                    <div className="flex items-center gap-2" data-testid="text-result-duration">
                      <span>{duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-white text-black hover:bg-gray-200 font-bold gap-2"
                onClick={handleDownloadClick}
                disabled={!url}
                data-testid="button-download-result"
              >
                <Download className="h-5 w-5" />
                Download Sekarang
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
