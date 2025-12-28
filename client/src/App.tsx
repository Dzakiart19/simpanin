import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import YoutubePage from "@/pages/Youtube";
import TiktokPage from "@/pages/Tiktok";
import SpotifyPage from "@/pages/Spotify";
import AdultPage from "@/pages/Adult";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/youtube" component={YoutubePage} />
      <Route path="/tiktok" component={TiktokPage} />
      <Route path="/spotify" component={SpotifyPage} />
      <Route path="/adult" component={AdultPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
