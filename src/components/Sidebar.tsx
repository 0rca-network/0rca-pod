import { useState } from 'react';
import { Plus, Star, Clock, TrendingUp, Zap, Shield, Target, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { categories } from '../data/dummy-data.js';

interface SidebarProps {
  isOpen: boolean;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
}

const navItems = [
  { id: 'featured', label: 'Featured', icon: Star },
  { id: 'newest', label: 'Newest', icon: Clock },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'top-rated', label: 'Top Rated', icon: Zap },
  { id: 'verified', label: 'Verified', icon: Shield },
  { id: 'specialized', label: 'Specialized', icon: Target },
];

export function Sidebar({ isOpen, activeFilter, onFilterChange, categoryFilter, onCategoryChange }: SidebarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [successRate, setSuccessRate] = useState([80]);
  const [onlineOnly, setOnlineOnly] = useState(false);

  const handleSubmitAgent = () => {
    // Navigate to submit agent page
    window.location.href = '/submit-agent';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => {}} 
      />
      
      <aside className="fixed left-0 top-[73px] bottom-0 w-72 bg-[#1C2A3A]/80 backdrop-blur-lg border-r border-neutral-800 z-40 overflow-y-auto">
        <div className="p-6">
          {/* Submit Agent Button */}
          <Button 
            onClick={handleSubmitAgent}
            className="w-full bg-[#63f2d2] hover:bg-[#3dd5b8] text-black mint-glow smooth-transition rounded-lg mb-6"
          >
            <Plus size={20} className="mr-2" />
            Submit Agent
          </Button>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
              <input 
                type="text"
                placeholder="Ask what you want to automate..."
                className="w-full bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#63f2d2] smooth-transition"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <p className="text-neutral-400 text-sm mb-4 px-4">Browse</p>
            <button
              onClick={() => onFilterChange('')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition ${
                activeFilter === '' 
                  ? 'border-l-2 border-[#BEF264] text-[#BEF264] bg-[#BEF264]/10' 
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Star size={20} />
              <span>All Agents</span>
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeFilter === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onFilterChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition ${
                    isActive 
                      ? 'border-l-2 border-[#BEF264] text-[#BEF264] bg-[#BEF264]/10' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Categories */}
          <div className="mt-8">
            <p className="text-neutral-400 text-sm mb-4 px-4">Categories</p>
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange('')}
                className={`w-full text-left px-4 py-2 rounded-lg smooth-transition ${
                  categoryFilter === '' 
                    ? 'text-[#BEF264] bg-[#BEF264]/10' 
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg smooth-transition ${
                    categoryFilter === category 
                      ? 'text-[#BEF264] bg-[#BEF264]/10' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="mt-8">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-neutral-400 hover:text-white smooth-transition"
            >
              <span className="text-sm">Advanced Filters</span>
              {filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {filtersOpen && (
              <div className="mt-4 space-y-6 px-4 py-4 bg-neutral-900/30 rounded-lg border border-neutral-800/50">
                {/* Price Range Slider */}
                <div>
                  <Label className="text-neutral-300 text-sm mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Success Rate Slider */}
                <div>
                  <Label className="text-neutral-300 text-sm mb-3 block">
                    Min Success Rate: {successRate[0]}%
                  </Label>
                  <Slider
                    value={successRate}
                    onValueChange={setSuccessRate}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Online Only Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-only" className="text-neutral-300 text-sm">
                    Show only online agents
                  </Label>
                  <Switch
                    id="online-only"
                    checked={onlineOnly}
                    onCheckedChange={setOnlineOnly}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
