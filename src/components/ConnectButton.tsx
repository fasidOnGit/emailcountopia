
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthButtons';

const ConnectButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Check if we have a valid session and redirect accordingly
    const checkSession = async () => {
      if (isAuthenticated) {
        // Check if we have Gmail credentials stored
        try {
          const { data, error } = await supabase
            .from('account_connections')
            .select('*')
            .eq('user_id', user?.id)
            .eq('provider', 'google')
            .single();
          
          if (data) {
            // We already have Gmail connected, redirect to dashboard
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error checking Gmail connection:', error);
        }
      }
    };
    
    checkSession();
  }, [isAuthenticated, user, navigate]);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in, redirect to auth
        toast({
          title: "Authentication required",
          description: "Please sign in to connect your Gmail account",
          variant: "default",
        });
        navigate('/auth');
        return;
      }
      
      // Request Gmail-specific scopes
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: 'email profile https://www.googleapis.com/auth/gmail.readonly',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        },
      });

      if (error) {
        toast({
          title: "Connection failed",
          description: error.message,
          variant: "destructive",
        });
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
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
