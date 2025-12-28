import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { Youtube, Music, Video, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const categories = [
    { name: "YouTube", icon: Youtube, path: "/youtube", color: "bg-red-600", desc: "Download Videos & MP3" },
    { name: "TikTok", icon: Video, path: "/tiktok", color: "bg-pink-600", desc: "No Watermark Videos" },
    { name: "Spotify", icon: Music, path: "/spotify", color: "bg-green-600", desc: "Get Music & Metadata" },
    { name: "Adult", icon: AlertCircle, path: "/adult", color: "bg-yellow-600", desc: "Private Downloader" },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center py-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            Stream<span className="text-primary">Save</span>
            </h1>
            <p className="mb-12 text-xl text-gray-400 max-w-2xl mx-auto">
            The ultimate all-in-one media downloader. Simple, fast, and premium quality.
            </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {categories.map((cat, index) => (
            <Link key={cat.path} href={cat.path}>
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative block overflow-hidden rounded-xl border border-white/10 bg-[#181818] p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-[#202020] cursor-pointer"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${cat.color} bg-opacity-20 text-white`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.desc}</p>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
