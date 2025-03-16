
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ConnectButton from '@/components/ConnectButton';

const Auth = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container flex flex-col items-center justify-center px-4 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="clean-card p-8">
              <ConnectButton />
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Simple Footer */}
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

export default Auth;
