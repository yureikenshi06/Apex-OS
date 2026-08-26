import React from 'react';
import { Search, Plus, User as UserIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from './auth-provider';

export function Header() {
  const location = useLocation();
  const { user } = useAuth();
  
  // Basic logic to derive title from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0 
    ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) 
    : 'Home';

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#0a0a0f]/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-white tracking-tight">{title}</h1>
      </div>
      
      <div className="flex flex-1 items-center justify-center px-4 hidden md:flex">
        <Button 
          variant="outline" 
          className="w-full max-w-md justify-start text-sm text-zinc-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
        >
          <Search className="mr-2 h-4 w-4" />
          Search or press ⌘K
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost" className="hidden md:flex text-zinc-400 hover:text-white">
          <Plus className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
          <UserIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
