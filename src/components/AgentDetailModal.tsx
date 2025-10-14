import { useState } from 'react';
import { X, Play, Clock, DollarSign, Star, CheckCircle, LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AgentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: number;
    name: string;
    developer: string;
    icon: LucideIcon;
    jobs: number;
    successRate: number;
    price: string;
    category: string;
  } | null;
}

// Mock chart data for Live Analytics
const chartData = [
  { date: 'Day 1', uptime: 99.9, responseTime: 120, transactions: 450 },
  { date: 'Day 5', uptime: 99.8, responseTime: 115, transactions: 520 },
  { date: 'Day 10', uptime: 99.9, responseTime: 110, transactions: 580 },
  { date: 'Day 15', uptime: 100, responseTime: 105, transactions: 640 },
  { date: 'Day 20', uptime: 99.7, responseTime: 118, transactions: 710 },
  { date: 'Day 25', uptime: 99.9, responseTime: 108, transactions: 780 },
  { date: 'Day 30', uptime: 100, responseTime: 102, transactions: 850 },
];

// Mock reviews
const reviews = [
  {
    id: 1,
    wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    rating: 5,
    text: 'Absolutely incredible performance. This agent has processed over 10,000 data points for me with zero errors. Highly recommend!',
    verified: true
  },
  {
    id: 2,
    wallet: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    rating: 5,
    text: 'Lightning fast response times and accurate results every time. Worth every penny.',
    verified: true
  },
  {
    id: 3,
    wallet: '0x123d35Cc6634C0532925a3b844Bc9e7595f0abc',
    rating: 4,
    text: 'Great agent overall. Had one minor issue with complex queries but support was responsive.',
    verified: true
  },
];

// Mock version history
const versions = [
  {
    version: 'v2.1.0',
    date: '2025-10-10',
    changes: [
      'Improved response time by 15%',
      'Added support for batch processing',
      'Fixed memory leak in long-running tasks',
      'Enhanced error handling and reporting'
    ]
  },
  {
    version: 'v2.0.0',
    date: '2025-09-22',
    changes: [
      'Major architecture overhaul',
      'Implemented caching layer',
      'Added real-time progress tracking',
      'Reduced operational costs by 20%'
    ]
  },
  {
    version: 'v1.8.5',
    date: '2025-09-05',
    changes: [
      'Security patch for authentication',
      'Minor UI improvements',
      'Updated dependencies'
    ]
  },
];

export function AgentDetailModal({ isOpen, onClose, agent }: AgentDetailModalProps) {
  const [activeTab, setActiveTab] = useState('playground');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [cost, setCost] = useState<number | null>(null);

  if (!agent) return null;

  const Icon = agent.icon;

  const handleRunSample = () => {
    if (!input.trim()) {
      setInput('{ "query": "sample data", "parameters": { "limit": 10 } }');
    }
    
    setIsRunning(true);
    setOutput('Processing...');
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const sampleOutput = {
        status: 'success',
        agent_id: agent?.id,
        data: {
          processed: true,
          result: `${agent?.name} processed your request successfully`,
          timestamp: new Date().toISOString(),
          confidence: 0.98,
          processing_time_ms: Math.floor(Math.random() * 500) + 100,
          tokens_used: Math.floor(Math.random() * 1000) + 500
        },
        metadata: {
          model_version: '2.1.0',
          category: agent?.category,
          developer: agent?.developer
        }
      };
      
      setOutput(JSON.stringify(sampleOutput, null, 2));
      setExecutionTime(sampleOutput.data.processing_time_ms);
      setCost(parseFloat((sampleOutput.data.tokens_used * 0.0001).toFixed(4)));
      setIsRunning(false);
    }, Math.floor(Math.random() * 2000) + 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border border-neutral-800 text-white">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#63f2d2]/20 to-[#3dd5b8]/10 border border-[#63f2d2]/30 flex items-center justify-center">
                <Icon size={32} className="text-[#63f2d2]" strokeWidth={1.5} />
              </div>
              <div>
                <DialogTitle className="text-2xl text-white mb-1">{agent.name}</DialogTitle>
                <p className="text-neutral-400">by {agent.developer}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-900/50 border border-neutral-800">
            <TabsTrigger value="playground" className="data-[state=active]:bg-[#63f2d2] data-[state=active]:text-black">
              Playground
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#63f2d2] data-[state=active]:text-black">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-[#63f2d2] data-[state=active]:text-black">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="versions" className="data-[state=active]:bg-[#63f2d2] data-[state=active]:text-black">
              Versions
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Interactive Playground */}
          <TabsContent value="playground" className="mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Input Panel */}
              <div className="space-y-3">
                <label className="text-sm text-neutral-300">Input</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your test data here..."
                  className="min-h-[300px] bg-neutral-900/50 border-neutral-800 text-white font-mono text-sm resize-none"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleRunSample}
                    disabled={isRunning}
                    className="flex-1 bg-[#63f2d2] hover:bg-[#3dd5b8] text-black"
                  >
                    <Play size={16} className="mr-2" />
                    {isRunning ? 'Running...' : 'Run with Sample Data'}
                  </Button>
                  <Button 
                    onClick={() => { setInput(''); setOutput(''); setExecutionTime(null); setCost(null); }}
                    variant="outline"
                    className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {/* Output Panel */}
              <div className="space-y-3">
                <label className="text-sm text-neutral-300">Output</label>
                <pre className="min-h-[300px] bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 text-[#63f2d2] font-mono text-sm overflow-auto">
                  {output || '// Output will appear here'}
                </pre>
              </div>
            </div>

            {/* Execution Stats */}
            {executionTime !== null && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <Clock size={20} className="text-[#63f2d2]" />
                  <div>
                    <p className="text-xs text-neutral-400">Time Taken</p>
                    <p className="text-white">{executionTime}ms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <DollarSign size={20} className="text-[#63f2d2]" />
                  <div>
                    <p className="text-xs text-neutral-400">Cost</p>
                    <p className="text-white">${cost?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Tab 2: Live Analytics */}
          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl text-white">Live On-Chain Performance (Last 30 Days)</h3>
              
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#63f2d2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#63f2d2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="transactions" 
                      stroke="#63f2d2" 
                      fillOpacity={1} 
                      fill="url(#colorTransactions)" 
                      name="Transactions"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <p className="text-neutral-400 text-sm mb-2">Average Uptime</p>
                  <p className="text-2xl text-white">99.8%</p>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <p className="text-neutral-400 text-sm mb-2">Avg Response Time</p>
                  <p className="text-2xl text-white">110ms</p>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <p className="text-neutral-400 text-sm mb-2">Total Transactions</p>
                  <p className="text-2xl text-white">18.5K</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Verified Reviews */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-neutral-400 text-sm font-mono">{review.wallet}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-600'}
                          />
                        ))}
                      </div>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#BEF264]/10 border border-[#BEF264]/30">
                        <CheckCircle size={14} className="text-[#BEF264]" />
                        <span className="text-[#BEF264] text-xs">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <p className="text-neutral-300">{review.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 4: Version History */}
          <TabsContent value="versions" className="mt-6">
            <div className="space-y-6">
              {versions.map((version, index) => (
                <div key={version.version} className="relative pl-8 pb-6">
                  {/* Timeline line */}
                  {index !== versions.length - 1 && (
                    <div className="absolute left-[7px] top-8 bottom-0 w-[2px] bg-neutral-800" />
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#63f2d2] border-4 border-[#1A1A1A]" 
                    style={{ boxShadow: '0 0 10px rgba(99, 242, 210, 0.5)' }}
                  />
                  
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg text-white">{version.version}</h4>
                      <span className="text-sm text-neutral-400">{version.date}</span>
                    </div>
                    <ul className="space-y-2">
                      {version.changes.map((change, i) => (
                        <li key={i} className="text-neutral-300 text-sm flex items-start gap-2">
                          <span className="text-[#63f2d2] mt-1">•</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
