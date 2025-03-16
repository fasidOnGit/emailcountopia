
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react'; // Added missing import
import Navbar from '@/components/Navbar';
import { LoginButton, useAuth } from '@/components/AuthButtons';
import { supabase } from '@/integrations/supabase/client';
import ConnectButton from '@/components/ConnectButton';

const Auth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication and OAuth response
    const checkAuth = async () => {
      // Get the URL hash to check for OAuth response
      const hash = window.location.hash;
      
      if (hash && hash.includes('access_token')) {
        // Process the OAuth response
        const { data, error } = await supabase.auth.getSession();
        
        if (data.session) {
          // Save the OAuth credentials to our account_connections table
          const accessToken = new URLSearchParams(hash.substring(1)).get('access_token') || '';
          const expiresAt = new Date().getTime() + 3600 * 1000; // 1 hour expiry
          
          try {
            await supabase.from('account_connections').upsert({
              user_id: data.session.user.id,
              provider: 'google',
              provider_account_id: data.session.user.id,
              access_token: accessToken,
              expires_at: Math.floor(expiresAt / 1000),
            });
            
            navigate('/dashboard');
          } catch (error) {
            console.error('Error saving credentials:', error);
          }
        }
      }
      
      // If already authenticated and no OAuth process, redirect to dashboard
      if (isAuthenticated && !isLoading) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();
  }, [isAuthenticated, isLoading, navigate]);

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
