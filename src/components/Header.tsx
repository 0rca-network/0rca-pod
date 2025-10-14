import { useState } from 'react';
import { Search, Menu, Wallet, Copy, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useWallet } from '../contexts/WalletContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onToggleSidebar, searchQuery, onSearchChange }: HeaderProps) {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet, copyAddress } = useWallet();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };
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
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="sm:hidden text-white hover:text-[#63f2d2] smooth-transition p-2 hover:bg-white/5 rounded-lg"
          >
            <Search size={20} />
          </button>
          <img 
            src="/0rca-Photoroom.svg"
            alt="0rca Protocol"
            className="h-8 md:h-10 w-8 md:w-10 rounded-full object-cover cursor-pointer hover:opacity-80 smooth-transition"
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
          {walletAddress ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#63f2d2] hover:bg-[#3dd5b8] text-black mint-glow smooth-transition rounded-full px-3 md:px-6 text-sm flex items-center gap-2">
                  <Wallet size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="hidden md:inline">{truncateAddress(walletAddress)}</span>
                  <ChevronDown size={14} className="hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-900 border-neutral-800 text-white">
                <DropdownMenuItem onClick={copyAddress} className="hover:bg-neutral-800">
                  <Copy size={16} className="mr-2" />
                  Copy Address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={disconnectWallet} className="hover:bg-neutral-800">
                  <LogOut size={16} className="mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-[#63f2d2] hover:bg-[#3dd5b8] text-black mint-glow smooth-transition rounded-full px-3 md:px-6 text-sm"
            >
              <Wallet size={16} className="md:mr-2 md:w-[18px] md:h-[18px]" />
              <span className="hidden md:inline">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="sm:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-full py-3 pl-12 pr-4 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#63f2d2] smooth-transition"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
