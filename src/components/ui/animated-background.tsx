import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'signin' | 'welcome' | 'meals' | 'selection' | 'confirmation' | 'shopping';
  children: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'signin', 
  children 
}) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'signin':
        return 'from-orange-50 via-amber-50 to-green-50';
      case 'welcome':
        return 'from-blue-50 via-indigo-50 to-purple-50';
      case 'meals':
        return 'from-green-50 via-emerald-50 to-blue-50';
      case 'selection':
        return 'from-purple-50 via-pink-50 to-rose-50';
      case 'confirmation':
        return 'from-indigo-50 via-blue-50 to-cyan-50';
      case 'shopping':
        return 'from-emerald-50 via-green-50 to-teal-50';
      default:
        return 'from-gray-50 via-slate-50 to-zinc-50';
    }
  };

  const getFloatingElements = () => {
    switch (variant) {
      case 'signin':
        return (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-red-200/10 to-pink-200/10 rounded-full blur-2xl animate-bounce delay-2000"></div>
          </>
        );
      case 'welcome':
        return (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-200/15 to-blue-200/15 rounded-full blur-2xl animate-bounce delay-1500"></div>
          </>
        );
      default:
        return (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-zinc-200/20 to-stone-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getGradientClasses()} relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden">
        {getFloatingElements()}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};