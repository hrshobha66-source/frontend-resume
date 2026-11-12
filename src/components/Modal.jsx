import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  confirmVariant = 'primary',
  isConfirmLoading = false,
  maxWidth = 'max-w-md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full ${maxWidth} border border-slate-200 animate-slideUp`}>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                {title && (
                  <h3 className="text-lg font-bold text-slate-900" id="modal-title">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              {children}
            </div>
          </div>

          {(onConfirm || cancelText) && (
            <div className="bg-slate-50/80 px-6 py-4 flex flex-row-reverse gap-3 border-t border-slate-100">
              {onConfirm && (
                <Button
                  variant={confirmVariant}
                  onClick={onConfirm}
                  isLoading={isConfirmLoading}
                >
                  {confirmText}
                </Button>
              )}
              {cancelText && (
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isConfirmLoading}
                >
                  {cancelText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
