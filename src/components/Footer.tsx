import { Twitter, MessageCircle, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-neutral-800 mt-auto">
      <div className="px-4 md:px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
          {/* Left - Logo and Copyright */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <ImageWithFallback 
              src="/0rca-Photoroom.svg"
              alt="0rca Protocol"
              className="h-5 md:h-6 w-auto"
            />
            <span className="text-neutral-500 text-xs md:text-sm">© 2025 0rca Protocol</span>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <a href="https://docs.0rca.network" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#63f2d2] smooth-transition text-xs md:text-sm">
              Docs
            </a>
            <a href="https://pod.0rca.network" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#63f2d2] smooth-transition text-xs md:text-sm">
              Pod
            </a>
            <a href="https://forum.0rca.network" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#63f2d2] smooth-transition text-xs md:text-sm">
              Forum
            </a>
            <a href="https://about.0rca.network" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#63f2d2] smooth-transition text-xs md:text-sm">
              About 0rca
            </a>
            <a href="https://whitepaper.0rca.network" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#63f2d2] smooth-transition text-xs md:text-sm">
              Whitepaper
            </a>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <a 
              href="https://x.com/0rcaNetwork" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#63f2d2] smooth-transition p-2 hover:bg-white/5 rounded-lg group"
            >
              <Twitter size={20} className="group-hover:mint-glow smooth-transition" />
            </a>
            <a 
              href="mailto:zero80932@gmail.com" 
              className="text-neutral-400 hover:text-[#63f2d2] smooth-transition p-2 hover:bg-white/5 rounded-lg group"
            >
              <MessageCircle size={20} className="group-hover:mint-glow smooth-transition" />
            </a>
            <a 
              href="https://github.com/0rca-network/0rca-core" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#63f2d2] smooth-transition p-2 hover:bg-white/5 rounded-lg group"
            >
              <Github size={20} className="group-hover:mint-glow smooth-transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
