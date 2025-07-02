'use client';

import { useEffect } from 'react';
import { Card } from './card';
import { Button } from './button';
import { RxCross2 } from 'react-icons/rx';
import { ToastMessage } from '@/hooks/useToast';

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

export const Toast = ({ toast, onRemove }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100';
      case 'error':
        return 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100';
      default:
        return 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100';
    }
  };

  return (
    <Card className={`relative p-4 shadow-lg ${getToastStyles()}`}>
      <div className="pr-8">
        <div className="font-semibold">{toast.title}</div>
        {toast.description && (
          <div className="mt-1 text-sm opacity-90">{toast.description}</div>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="absolute right-2 top-2 h-6 w-6 p-0"
        onClick={() => onRemove(toast.id)}
      >
        <RxCross2 className="h-3 w-3" />
      </Button>
    </Card>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};