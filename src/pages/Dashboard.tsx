
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import EmailStatsCard from '@/components/EmailStatsCard';
import EmailChart from '@/components/EmailChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

// Mock data for top senders
const topSenders = [
  { id: 1, name: 'Company A', email: 'newsletters@companya.com', count: 143, domain: 'companya.com' },
  { id: 2, name: 'Newsletter B', email: 'updates@newsletterb.org', count: 98, domain: 'newsletterb.org' },
  { id: 3, name: 'Platform C', email: 'no-reply@platformc.io', count: 87, domain: 'platformc.io' },
  { id: 4, name: 'Service D', email: 'support@serviced.co', count: 72, domain: 'serviced.co' },
  { id: 5, name: 'Person E', email: 'person.e@gmail.com', count: 53, domain: 'gmail.com' },
  { id: 6, name: 'Updates F', email: 'updates@servicesf.net', count: 48, domain: 'servicesf.net' },
  { id: 7, name: 'Company G', email: 'hello@companyg.com', count: 41, domain: 'companyg.com' },
  { id: 8, name: 'Service H', email: 'info@serviceh.io', count: 37, domain: 'serviceh.io' },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  
  // Filter senders based on search query
  const filteredSenders = topSenders.filter(sender => 
    sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sender.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sender.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-16">
        <div className="container px-4 md:px-6 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Email Sender Dashboard</h1>
            <p className="text-muted-foreground">
              Analyze and track your email sender statistics
            </p>
          </motion.div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <EmailStatsCard 
              title="Total Emails" 
              value="1,243" 
              change={{ value: 12, type: 'increase' }}
              description="Last 30 days"
              icon="mail"
              delay={0}
            />
            <EmailStatsCard 
              title="Unique Senders" 
              value="87" 
              change={{ value: 5, type: 'increase' }}
              description="Last 30 days"
              icon="users"
              delay={1}
            />
            <EmailStatsCard 
              title="Busiest Day" 
              value="Tuesday" 
              description="Average of 45 emails"
              icon="calendar"
              delay={2}
            />
            <EmailStatsCard 
              title="Top Domain" 
              value="gmail.com" 
              description="23% of all emails"
              icon="mail"
              delay={3}
            />
          </div>
          
          {/* Chart Section */}
          <div className="mb-8">
            <EmailChart />
          </div>
          
          {/* Top Senders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="clean-card overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Top Email Senders</h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email or domain..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All time</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="24hours">Last 24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">Export</Button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sender</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSenders.length > 0 ? (
                      filteredSenders.map((sender) => (
                        <TableRow key={sender.id}>
                          <TableCell className="font-medium">{sender.name}</TableCell>
                          <TableCell>{sender.email}</TableCell>
                          <TableCell>{sender.domain}</TableCell>
                          <TableCell className="text-right">{sender.count}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          No results found for "{searchQuery}"
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmailCounter. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
