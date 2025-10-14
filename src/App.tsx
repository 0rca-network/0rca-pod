import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { GlobalStatsBar } from './components/GlobalStatsBar';
import { Sidebar } from './components/Sidebar';
import { AgentCard } from './components/AgentCard';
import { AgentDetailModal } from './components/AgentDetailModal';
import { Footer } from './components/Footer';
import { Starfield } from './components/Starfield';
import { useTheme } from './contexts/ThemeContext';
import { agents } from './data/dummy-data.js';
import { Grid3x3, List } from 'lucide-react';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');



  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let filtered = agents;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(agent => 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(agent => agent.category === categoryFilter);
    }

    // Active filter
    if (activeFilter) {
      switch (activeFilter) {
        case 'featured':
          filtered = filtered.filter(agent => agent.featured);
          break;
        case 'newest':
          filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'trending':
          filtered = filtered.filter(agent => agent.isTrending);
          break;
        case 'top-rated':
          filtered = filtered.sort((a, b) => b.successRate - a.successRate);
          break;
        case 'verified':
          filtered = filtered.filter(agent => agent.successRate >= 95);
          break;
        case 'specialized':
          filtered = filtered.filter(agent => agent.category === 'Specialized');
          break;
      }
    }

    // Sort by dropdown
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return filtered.sort((a, b) => b.jobs - a.jobs);
      case 'rating':
        return filtered.sort((a, b) => b.successRate - a.successRate);
      default:
        return filtered;
    }
  }, [searchQuery, activeFilter, categoryFilter, sortBy]);

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Geometric Pattern Overlay */}
      <div className="fixed inset-0 geometric-bg pointer-events-none" style={{ zIndex: 5 }} />
      
      {/* Header */}
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Global Stats Bar */}
      <GlobalStatsBar />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      {/* Main Content */}
      <main 
        className={`flex-1 pt-[170px] transition-all duration-300 relative ${
          sidebarOpen ? 'lg:pl-72' : 'pl-0'
        }`}
        style={{ zIndex: 10 }}
      >
        <div className="px-4 md:px-8 py-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-white mb-2">0rca Pod</h1>
              <p className="text-neutral-400">Discover and deploy AI agents for any task</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Sort By */}
              <div className="flex items-center gap-2 flex-1 md:flex-initial">
                <span className="text-neutral-400 text-sm hidden sm:inline">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#63f2d2] smooth-transition cursor-pointer w-full md:w-auto"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded smooth-transition ${
                    viewMode === 'grid' 
                      ? 'bg-[#63f2d2] text-black' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded smooth-transition ${
                    viewMode === 'list' 
                      ? 'bg-[#63f2d2] text-black' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Agent Grid */}
          <div className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredAgents.map((agent) => (
              <AgentCard 
                key={agent.id} 
                {...agent} 
                onClick={() => setSelectedAgent(agent)}
              />
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400">No agents found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Agent Detail Modal */}
      <AgentDetailModal 
        isOpen={selectedAgent !== null}
        onClose={() => setSelectedAgent(null)}
        agent={selectedAgent}
      />
    </div>
  );
}
