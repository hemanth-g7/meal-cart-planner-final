import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MealCardProps {
  id: string;
  name: string;
  image?: string;
  selected?: boolean;
  frequency?: number;
  onClick?: () => void;
  variant?: 'selection' | 'frequency' | 'summary';
  className?: string;
}

export const MealCard: React.FC<MealCardProps> = ({
  id,
  name,
  image,
  selected = false,
  frequency,
  onClick,
  variant = 'selection',
  className
}) => {
  const getCardClasses = () => {
    const baseClasses = 'cursor-pointer transition-all duration-300 hover:scale-105 group border-0';
    
    if (selected) {
      return `${baseClasses} ring-4 ring-blue-500 bg-blue-50/80 backdrop-blur-sm shadow-xl`;
    }
    
    return `${baseClasses} hover:shadow-xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95`;
  };

  const getImageClasses = () => {
    switch (variant) {
      case 'selection':
        return 'w-20 h-20';
      case 'frequency':
        return 'w-16 h-16';
      case 'summary':
        return 'w-14 h-14';
      default:
        return 'w-20 h-20';
    }
  };

  return (
    <Card 
      className={cn(getCardClasses(), className)}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className={cn(
          getImageClasses(),
          'mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300'
        )}>
          <span className="text-3xl">🍽️</span>
        </div>
        
        <h4 className="font-semibold text-gray-800 text-lg mb-2">{name}</h4>
        
        {variant === 'frequency' && frequency && (
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
            <Clock className="w-4 h-4" />
            <span>{frequency}x/month</span>
          </div>
        )}
        
        {selected && variant === 'selection' && (
          <div className="flex items-center justify-center mt-3">
            <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              <CheckCircle className="w-3 h-3 mr-1" />
              Selected
            </Badge>
          </div>
        )}
        
        {variant === 'summary' && frequency && (
          <Badge className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {frequency}x
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};