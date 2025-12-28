import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-30 w-full transition-all duration-300 md:pl-64",
        isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile Logo */}
        <div className="md:hidden">
            <span className="text-xl font-bold tracking-tighter text-primary">
              STREAM<span className="text-white">SAVE</span>
            </span>
        </div>

        {/* Desktop Nav - Right Side */}
        <div className="hidden md:flex md:items-center md:gap-6 ml-auto">
          <Link href="/">
            <a className="text-sm font-medium text-gray-300 hover:text-white">Home</a>
          </Link>
          <Button variant="destructive" size="sm" className="bg-primary hover:bg-red-700">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/95 p-4 md:hidden border-b border-white/10">
          <nav className="flex flex-col gap-4">
             <Link href="/youtube"><a className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>YouTube</a></Link>
             <Link href="/tiktok"><a className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>TikTok</a></Link>
             <Link href="/spotify"><a className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Spotify</a></Link>
             <Link href="/adult"><a className="text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Adult (18+)</a></Link>
          </nav>
        </div>
      )}
    </header>
  );
}
