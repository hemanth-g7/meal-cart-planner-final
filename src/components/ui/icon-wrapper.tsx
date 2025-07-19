import React from 'react';
import { cn } from '@/lib/utils';

interface IconWrapperProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  animated = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-blue-500 to-purple-600';
      case 'secondary':
        return 'bg-gradient-to-br from-gray-500 to-slate-600';
      case 'success':
        return 'bg-gradient-to-br from-green-500 to-emerald-600';
      case 'warning':
        return 'bg-gradient-to-br from-orange-500 to-red-500';
      case 'danger':
        return 'bg-gradient-to-br from-red-500 to-pink-600';
      case 'info':
        return 'bg-gradient-to-br from-cyan-500 to-blue-600';
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'md':
        return 'w-16 h-16';
      case 'lg':
        return 'w-20 h-20';
      case 'xl':
        return 'w-24 h-24';
      default:
        return 'w-16 h-16';
    }
  };

  const animationClasses = animated ? 'hover:scale-110 hover:rotate-3 transition-transform duration-300' : '';

  return (
    <div className={cn(
      getVariantClasses(),
      getSizeClasses(),
      'rounded-2xl flex items-center justify-center mx-auto shadow-lg text-white',
      animationClasses,
      className
    )}>
      {children}
    </div>
  );
};