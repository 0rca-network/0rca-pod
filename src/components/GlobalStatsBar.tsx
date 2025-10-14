import { Activity, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function GlobalStatsBar() {
  const [agents, setAgents] = useState(1421);
  const [transactions, setTransactions] = useState(1200000);
  const [value, setValue] = useState(3.4);

  // Simulate live updating stats
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev + Math.floor(Math.random() * 3));
      setTransactions(prev => prev + Math.floor(Math.random() * 100));
      setValue(prev => +(prev + Math.random() * 0.01).toFixed(2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toLocaleString();
  };

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-[73px] left-0 right-0 z-40 bg-black/50 backdrop-blur-lg border-b border-neutral-800"
    >
      <div className="px-4 md:px-8 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {/* Total Agents Online */}
          <div className="flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg bg-neutral-900/30 border border-neutral-800/50 hover:border-[#63f2d2]/30 smooth-transition">
            <div className="w-10 h-10 rounded-lg bg-[#63f2d2]/10 border border-[#63f2d2]/30 flex items-center justify-center">
              <Activity size={20} className="text-[#63f2d2]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-neutral-400 text-xs">Total Agents Online</p>
              <motion.p 
                key={agents}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-white"
              >
                {agents.toLocaleString()}
              </motion.p>
            </div>
          </div>

          {/* Transactions 24h */}
          <div className="flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg bg-neutral-900/30 border border-neutral-800/50 hover:border-[#63f2d2]/30 smooth-transition">
            <div className="w-10 h-10 rounded-lg bg-[#63f2d2]/10 border border-[#63f2d2]/30 flex items-center justify-center">
              <TrendingUp size={20} className="text-[#63f2d2]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-neutral-400 text-xs">Transactions (24h)</p>
              <motion.p 
                key={transactions}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-white"
              >
                {formatNumber(transactions)}
              </motion.p>
            </div>
          </div>

          {/* Total Value Settled */}
          <div className="flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg bg-neutral-900/30 border border-neutral-800/50 hover:border-[#63f2d2]/30 smooth-transition">
            <div className="w-10 h-10 rounded-lg bg-[#63f2d2]/10 border border-[#63f2d2]/30 flex items-center justify-center">
              <DollarSign size={20} className="text-[#63f2d2]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-neutral-400 text-xs">Total Value Settled</p>
              <motion.p 
                key={value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-white"
              >
                ${value}M
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
