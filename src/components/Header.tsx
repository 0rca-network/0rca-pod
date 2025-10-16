import { Search, Menu } from 'lucide-react';
import { ConnectWalletButton } from './connect-wallet-button';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onToggleSidebar, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-neutral-800">
      <div className="flex items-center justify-between px-4 md:px-6 py-4 gap-2 md:gap-4">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onToggleSidebar}
            className="text-white hover:text-[#63f2d2] smooth-transition p-2 hover:bg-white/5 rounded-lg"
          >
            <Menu size={20} className="md:w-6 md:h-6" />
          </button>

          <img 
            src="/0rca-Photoroom.svg"
            alt="0rca Protocol"
            className="h-10 md:h-10 w-12 md:w-10 rounded-full object-cover cursor-pointer hover:opacity-80 smooth-transition"
            onClick={() => window.open('https://0rca.network', '_blank')}
          />
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 md:mx-8 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-full py-2 md:py-3 pl-10 md:pl-12 pr-4 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#63f2d2] smooth-transition"
            />
          </div>
        </div>

        {/* Right side - Connect Wallet */}
        <div className="flex items-center gap-2 md:gap-4">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
