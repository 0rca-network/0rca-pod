import { Briefcase, CheckCircle, DollarSign, LucideIcon, Flame, Zap as ZapIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface AgentCardProps {
  id: number;
  name: string;
  developer: string;
  icon: LucideIcon;
  jobs: number;
  successRate: number;
  price: string;
  category: string;
  isOnline?: boolean;
  isTrending?: boolean;
  isLightningFast?: boolean;
  onClick?: () => void;
}

export function AgentCard({ 
  name, 
  developer, 
  icon: Icon, 
  jobs, 
  successRate, 
  price, 
  category,
  isOnline = true,
  isTrending = false,
  isLightningFast = false,
  onClick
}: AgentCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group bg-neutral-900/50 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-neutral-800 hover:border-[#63f2d2] smooth-transition cursor-pointer hover:backdrop-blur-xl hover:bg-neutral-900/70 hover:shadow-[0_0_30px_rgba(99,242,210,0.15)] relative"
    >
      {/* Live Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
          style={{
            boxShadow: isOnline 
              ? '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.3)'
              : '0 0 10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.3)'
          }}
        />
      </div>

      {/* Icon */}
      <div className="mb-4 md:mb-6 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#63f2d2]/20 to-[#3dd5b8]/10 border border-[#63f2d2]/30 flex items-center justify-center group-hover:mint-glow smooth-transition">
          <Icon size={32} className="text-[#63f2d2] md:w-9 md:h-9" strokeWidth={1.5} />
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className="text-xs px-2 md:px-3 py-1 rounded-full bg-neutral-800/50 text-neutral-400 border border-neutral-700">
          {category}
        </span>
      </div>

      {/* Name and Developer */}
      <h3 className="text-white mb-1">{name}</h3>
      <p className="text-neutral-400 text-sm mb-4 md:mb-6">by {developer}</p>

      {/* Metrics */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-800 gap-2">
        <div className="flex items-center gap-1">
          <Briefcase size={14} className="text-neutral-500 md:w-4 md:h-4" />
          <span className="text-neutral-300 text-xs md:text-sm">{jobs.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <CheckCircle size={14} className="text-[#BEF264] md:w-4 md:h-4" />
          <span className="text-neutral-300 text-xs md:text-sm">{successRate}%</span>
        </div>
        
        <div className="flex items-center gap-1">
          <DollarSign size={14} className="text-[#63f2d2] md:w-4 md:h-4" />
          <span className="text-white text-xs md:text-sm">{price}</span>
        </div>
      </div>

      {/* Dynamic Badges */}
      {(isTrending || isLightningFast) && (
        <div className="flex gap-2 mt-4">
          {isTrending && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs"
              style={{
                boxShadow: '0 0 10px rgba(249, 115, 22, 0.2)'
              }}
            >
              <Flame size={12} />
              <span>Trending</span>
            </motion.div>
          )}
          
          {isLightningFast && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs"
              style={{
                boxShadow: '0 0 10px rgba(234, 179, 8, 0.2)'
              }}
            >
              <ZapIcon size={12} />
              <span>Lightning Fast</span>
            </motion.div>
          )}
        </div>
      )}

      {/* View Details Button */}
      <div className="mt-4 pt-4 border-t border-neutral-800">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="w-full bg-[#63f2d2]/10 hover:bg-[#63f2d2]/20 text-[#63f2d2] border border-[#63f2d2]/30 hover:border-[#63f2d2]/50 rounded-lg py-2 px-4 text-sm smooth-transition font-medium"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
