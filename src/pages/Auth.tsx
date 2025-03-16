
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react'; 
import Navbar from '@/components/Navbar';
import { LoginButton, useAuth } from '@/components/AuthButtons';
import { supabase } from '@/integrations/supabase/client';
import ConnectButton from '@/components/ConnectButton';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);

  useEffect(() => {
    // Check for authentication and OAuth response
    const checkAuth = async () => {
      setIsProcessingOAuth(true);
      
      // Get the URL hash and search params to check for OAuth response
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(location.search);
      const isGmailConnect = searchParams.get('gmailConnect') === 'true';
      
      // Check if we have an OAuth response (hash with access_token)
      if (hash && hash.includes('access_token')) {
        // Process the OAuth response
        try {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Session error:', error);
            toast({
              title: "Authentication error",
              description: error.message,
              variant: "destructive",
            });
            setIsProcessingOAuth(false);
            return;
          }
          
          if (data.session) {
            console.log('Successfully authenticated, saving credentials');
            
            // Extract tokens from the hash
            const accessToken = new URLSearchParams(hash.substring(1)).get('access_token') || '';
            const refreshToken = new URLSearchParams(hash.substring(1)).get('refresh_token') || null;
            const expiresAt = new Date().getTime() + 3600 * 1000; // 1 hour expiry
            
            try {
              // Save the tokens to our account_connections table
              const { error: upsertError } = await supabase.from('account_connections').upsert({
                user_id: data.session.user.id,
                provider: 'google',
                provider_account_id: data.session.user.id,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_at: Math.floor(expiresAt / 1000),
              });
              
              if (upsertError) {
                console.error('Error saving credentials:', upsertError);
                toast({
                  title: "Connection error",
                  description: "Failed to save your Gmail connection",
                  variant: "destructive",
                });
                setIsProcessingOAuth(false);
                return;
              }
              
              toast({
                title: "Gmail connected",
                description: "Your Gmail account has been successfully connected",
                variant: "default",
              });
              
              navigate('/dashboard');
            } catch (error) {
              console.error('Error saving credentials:', error);
              toast({
                title: "Connection error",
                description: "Failed to save your Gmail connection",
                variant: "destructive",
              });
            }
          }
        } catch (error) {
          console.error('Error processing OAuth response:', error);
        }
      } else if (isAuthenticated && !isLoading && !isProcessingOAuth && !isGmailConnect) {
        // Only redirect if authenticated, not loading, not processing OAuth, and not in Gmail connect flow
        navigate('/dashboard');
      }
      
      setIsProcessingOAuth(false);
    };
    
    checkAuth();
  }, [isAuthenticated, isLoading, navigate, location.search, toast]);

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
              {!isAuthenticated ? (
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
                    <h3 className="text-xl font-semibold">Step 1: Sign in</h3>
                    <p className="text-muted-foreground text-balance">
                      First, sign in with your Google account to continue
                    </p>
                  </div>
                  
                  <LoginButton />
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6">
                  <div className="text-center space-y-2 max-w-sm">
                    <h3 className="text-xl font-semibold">Step 2: Connect to Gmail</h3>
                    <p className="text-muted-foreground text-balance">
                      Now, connect your Gmail account to analyze your email statistics
                    </p>
                  </div>
                  <ConnectButton />
                </div>
              )}
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
