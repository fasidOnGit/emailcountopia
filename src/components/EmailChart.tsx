
import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const COLORS = ['#33C3F0', '#66D1F7', '#99E0FA', '#CCEFFC', '#E5F7FD'];

// Mock data for the chart
const topSenderData = [
  { name: 'Company A', count: 143 },
  { name: 'Newsletter B', count: 98 },
  { name: 'Platform C', count: 87 },
  { name: 'Service D', count: 72 },
  { name: 'Person E', count: 53 },
];

// Weekly data
const weeklyData = [
  { day: 'Mon', count: 32 },
  { day: 'Tue', count: 45 },
  { day: 'Wed', count: 27 },
  { day: 'Thu', count: 38 },
  { day: 'Fri', count: 53 },
  { day: 'Sat', count: 18 },
  { day: 'Sun', count: 11 },
];

const EmailChart = () => {
  const [activeTab, setActiveTab] = useState('top-senders');
  const [animateChart, setAnimateChart] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Add a small delay before animating the chart to ensure smooth transitions
    const timer = setTimeout(() => setAnimateChart(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-sm rounded-md">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-primary font-semibold">
            {payload[0].value} emails
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: animateChart ? 1 : 0, y: animateChart ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="overflow-hidden clean-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Email Analysis</CardTitle>
          <CardDescription>
            Visual representation of your email traffic
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="top-senders" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="top-senders">Top Senders</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="px-2 pt-4 pb-2">
            <TabsContent value="top-senders" className="mt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {isMobile ? (
                    // Pie chart for mobile
                    <PieChart>
                      <Pie
                        data={topSenderData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {topSenderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  ) : (
                    // Bar chart for desktop
                    <BarChart
                      data={topSenderData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="#33C3F0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#33C3F0" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default EmailChart;
