import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className
}) => {
  return (
    <div className={cn('flex items-center justify-center mb-8', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
              index < currentStep 
                ? 'bg-green-500 text-white shadow-lg' 
                : index === currentStep
                ? 'bg-blue-500 text-white shadow-lg scale-110'
                : 'bg-gray-200 text-gray-500'
            )}>
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={cn(
              'text-xs mt-2 font-medium transition-colors duration-300',
              index <= currentStep ? 'text-gray-700' : 'text-gray-400'
            )}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              'w-16 h-0.5 mx-4 transition-colors duration-300',
              index < currentStep ? 'bg-green-500' : 'bg-gray-200'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};