import React from 'react';
import { Search, Plus, User as UserIcon, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from './auth-provider';
import { useUIStore } from '@/store/ui-store';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { setCommandPaletteOpen, openQuickAdd } = useUIStore();
  
  const pathParts = location.pathname.split('/').filter(Boolean);
  const firstPart = pathParts[0] || 'Home';
  const title = firstPart.toLowerCase() === 'cfa' 
    ? 'CFA' 
    : firstPart.charAt(0).toUpperCase() + firstPart.slice(1);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#05060a]/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-black text-white tracking-tight">{title}</h1>
      </div>
      
      <div className="flex flex-1 items-center justify-center px-4 hidden md:flex">
        <Button 
          variant="outline" 
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full max-w-md justify-between text-sm text-zinc-400 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white rounded-xl shadow-inner transition-all hover:border-blue-500/40"
        >
          <span className="flex items-center">
            <Search className="mr-2 h-4 w-4 text-blue-400" />
            Type a command or search...
          </span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-white/10 px-1.5 font-mono text-[10px] font-medium text-zinc-300">
            ⌘K
          </kbd>
        </Button>
      </div>

      <div className="flex items-center gap-2.5">
        <Button 
          size="sm" 
          onClick={() => openQuickAdd('task')}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shadow-blue-600/30 gap-1.5 font-bold px-3.5 transition-all"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Quick Add</span>
        </Button>
        
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>

        <button
          onClick={handleSignOut}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
