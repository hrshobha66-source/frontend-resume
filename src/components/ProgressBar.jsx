import React from 'react';

const colorMap = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  orange: 'bg-orange-500',
  blue: 'bg-blue-600',
  rose: 'bg-rose-500',
};

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  sublabel,
  color = 'indigo',
  size = 'md',
  showPercentage = true,
  animate = true,
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const barColor = colorMap[color] || (
    percentage >= 80 ? 'bg-emerald-500' :
    percentage >= 70 ? 'bg-amber-500' : 'bg-orange-500'
  );

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs sm:text-sm">
          {label ? (
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              {label}
              {sublabel && <span className="font-normal text-slate-400">({sublabel})</span>}
            </span>
          ) : <span />}
          {showPercentage && (
            <span className="font-bold text-slate-800 tabular-nums">
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightStyles[size] || heightStyles.md}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor} ${animate ? 'transition-[width]' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
