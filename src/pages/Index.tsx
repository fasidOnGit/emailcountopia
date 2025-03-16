
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      title: 'Track Email Senders',
      description: 'Identify your most frequent email senders and analyze communication patterns',
      icon: '📊',
    },
    {
      title: 'Visual Analytics',
      description: 'Beautiful charts and visual representations of your email data',
      icon: '📈',
    },
    {
      title: 'Smart Filtering',
      description: 'Filter and segment data based on time periods, domains, and more',
      icon: '🔍',
    },
    {
      title: 'Privacy-Focused',
      description: 'We only process metadata, never reading the content of your emails',
      icon: '🔒',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight mb-4"
              >
                Powerful Features
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground"
              >
                Gain insights into your email traffic with our intuitive tools
              </motion.p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="clean-card p-6 text-center"
                >
                  <div className="mb-4 text-4xl flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="text-primary text-4xl mb-6">❝</div>
              <blockquote className="text-2xl font-medium mb-6 text-balance">
                "This tool helped me understand who's filling my inbox and allowed me to better manage my email communication."
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 mb-2"></div>
                <div className="font-semibold">Alex Johnson</div>
                <div className="text-sm text-muted-foreground">Product Manager</div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-10 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded-md p-1">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24">
                    <path 
                      fill="currentColor" 
                      d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold">EmailCounter</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Analyze and visualize your email sender statistics</p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmailCounter. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
