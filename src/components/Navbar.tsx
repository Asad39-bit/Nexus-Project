import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-400 hover:bg-slate-50 rounded-md md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center relative text-slate-400 focus-within:text-slate-600">
          <Search className="w-4 h-4 absolute left-3" />
          <input 
            type="text" 
            placeholder="Search commands..." 
            className="pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64 text-slate-900"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm cursor-pointer md:hidden">
          US
        </div>
      </div>
    </header>
  );
}
