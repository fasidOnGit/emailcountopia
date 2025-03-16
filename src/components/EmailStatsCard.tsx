
import { motion } from 'framer-motion';
import { Mail, ArrowUp, ArrowDown, Users, Calendar } from 'lucide-react';

type EmailStatsCardProps = {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  description?: string;
  icon?: 'mail' | 'users' | 'calendar';
  delay?: number;
};

const EmailStatsCard = ({ 
  title, 
  value, 
  change, 
  description, 
  icon = 'mail', 
  delay = 0 
}: EmailStatsCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'mail':
        return <Mail className="h-5 w-5" />;
      case 'users':
        return <Users className="h-5 w-5" />;
      case 'calendar':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + (delay * 0.1) }}
      className="clean-card p-6 hover-scale"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-1">
              {change.type === 'increase' ? (
                <ArrowUp className="h-3.5 w-3.5 text-green-500 mr-1" />
              ) : change.type === 'decrease' ? (
                <ArrowDown className="h-3.5 w-3.5 text-red-500 mr-1" />
              ) : null}
              
              <span 
                className={`text-xs font-medium ${
                  change.type === 'increase' 
                    ? 'text-green-500' 
                    : change.type === 'decrease' 
                    ? 'text-red-500' 
                    : 'text-gray-500'
                }`}
              >
                {change.value}% {change.type === 'increase' ? 'more' : 'less'}
              </span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        
        <div className="bg-primary/10 p-2 rounded-full">
          {getIcon()}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailStatsCard;
