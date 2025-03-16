
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-50 pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2"
          >
            <Mail className="h-3.5 w-3.5 mr-1.5" />
            Gmail Insights
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-3xl"
          >
            Understand who's filling your inbox
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-balance"
          >
            Track, analyze, and visualize your email senders with precision and elegance
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button asChild size="lg" className="h-12 px-8 font-medium">
              <Link to="/auth">Connect Gmail</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 font-medium">
              <Link to="/dashboard">View Demo</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="container mt-16 md:mt-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="clean-card hero-animation overflow-hidden shadow-glass">
            <img 
              src="https://framerusercontent.com/images/kfr022WaJ8YJUyZFmdwCB3pXRA.png" 
              alt="Email analytics dashboard"
              className="w-full h-auto rounded-lg object-cover"
              style={{ aspectRatio: "16/9" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
