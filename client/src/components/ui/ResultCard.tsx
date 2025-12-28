import { motion } from "framer-motion";
import { Play, Download, Music, Film, Clock, User } from "lucide-react";
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-10 w-full max-w-4xl"
    >
      <Card className="overflow-hidden border-white/10 bg-[#181818] hover:bg-[#202020] transition-colors">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail Section */}
            <div className="relative md:w-2/5 aspect-video md:aspect-auto group overflow-hidden">
              <img 
                src={thumbnail} 
                alt={title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="rounded-full bg-primary/90 p-3 shadow-lg backdrop-blur-sm">
                   {type === 'video' ? <Play className="fill-white text-white" /> : <Music className="text-white" />}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between p-6 md:w-3/5">
              <div>
                <h3 className="mb-2 text-2xl font-bold leading-tight text-white line-clamp-2">{title}</h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  {author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{author}</span>
                    </div>
                  )}
                  {duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <Button 
                    size="lg" 
                    className="w-full bg-white text-black hover:bg-gray-200 font-bold gap-2"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <Download className="h-5 w-5" />
                    Download Now
                 </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
