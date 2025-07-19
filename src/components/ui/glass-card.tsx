import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'minimal';
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl';
      case 'minimal':
        return 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg';
      default:
        return 'bg-white/80 backdrop-blur-lg border border-white/25 shadow-xl';
    }
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-[1.02] transition-all duration-300' : '';

  return (
    <Card className={cn(
      getVariantClasses(),
      hoverClasses,
      'border-0',
      className
    )}>
      {children}
    </Card>
  );
};

export const GlassCardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <CardHeader className={cn('text-center pb-8', className)}>
    {children}
  </CardHeader>
);

export const GlassCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <CardContent className={cn('px-8 pb-8', className)}>
    {children}
  </CardContent>
);