import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  error,
  helperText,
  icon: Icon,
  endAdornment,
  className = '',
  required = false,
  ...props
}, ref) => {
  const inputId = id || name;

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={`
            block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-150
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${endAdornment ? 'pr-11' : ''}
            ${error
              ? 'border-rose-300 text-rose-900 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100 hover:border-slate-400'
            }
            ${className}
          `}
          {...props}
        />

        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endAdornment}
          </div>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-rose-600 flex items-center gap-1 animate-fadeIn">
          <span className="inline-block w-1 h-1 rounded-full bg-rose-600"></span>
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
