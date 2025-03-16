
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ConnectButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  
  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth connection
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Successfully connected",
        description: "Your Gmail account has been connected successfully",
        variant: "default",
      });
      
      // Navigate to dashboard in a real implementation
      // navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2"
      >
        <Mail className="h-10 w-10 text-primary" />
      </motion.div>
      
      <div className="text-center space-y-2 max-w-sm">
        <h3 className="text-xl font-semibold">Connect your Gmail account</h3>
        <p className="text-muted-foreground text-balance">
          Connect your Gmail account to analyze and visualize your email sender statistics
        </p>
      </div>
      
      <Button 
        size="lg" 
        className="min-w-[200px]"
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect Gmail"
        )}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center max-w-xs">
        We only read your email metadata and never store your actual email content
      </p>
    </div>
  );
};

export default ConnectButton;
