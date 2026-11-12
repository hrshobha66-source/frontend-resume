import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({
  size = 'md',
  message,
  className = '',
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const content = (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className}`}>
      <Loader2 className={`text-indigo-600 animate-spin ${sizeClasses[size] || sizeClasses.md}`} />
      {message && <p className="mt-3 text-sm font-medium text-slate-600 animate-pulse">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200/80 rounded-md ${className}`} />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 space-y-4 shadow-soft">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  );
};
