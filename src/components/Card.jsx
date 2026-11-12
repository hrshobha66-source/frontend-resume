import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-slate-200/80 shadow-soft
        ${hoverEffect ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg hover:border-indigo-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = '',
  title,
  subtitle,
  action
}) => {
  return (
    <div className={`p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 ${className}`}>
      {(title || subtitle) ? (
        <div className="space-y-1">
          {title && <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>}
        </div>
      ) : children}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const CardContent = ({
  children,
  className = ''
}) => {
  return (
    <div className={`p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className = ''
}) => {
  return (
    <div className={`p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
};
