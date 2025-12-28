import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Youtube, Music, Video, User, Search, AlertCircle } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const menuItems = [
    { name: "YouTube", icon: Youtube, path: "/youtube", color: "text-red-500" },
    { name: "TikTok", icon: Video, path: "/tiktok", color: "text-pink-500" },
    { name: "Spotify", icon: Music, path: "/spotify", color: "text-green-500" },
    { name: "Adult (18+)", icon: AlertCircle, path: "/adult", color: "text-yellow-500" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-white/10 bg-black/95 transition-transform md:translate-x-0">
      <div className="flex h-16 items-center px-6">
        <Link href="/">
          <a className="text-2xl font-bold tracking-tighter text-primary" data-testid="link-home">
            STREAM<span className="text-white">SAVE</span>
          </a>
        </Link>
      </div>

      <div className="px-4 py-6">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </p>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-white/10",
                  location === item.path ? "bg-white/10 text-white" : "text-gray-400"
                )}
                data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className={cn("h-5 w-5", item.color)} />
                {item.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
