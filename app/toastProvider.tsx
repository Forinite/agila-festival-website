// components/ui/ToastProvider.tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { registerToast } from '@/lib/toast';


interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error';
}

type ToastContextType = {
    show: (message: string, type: 'success' | 'error') => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => useContext(ToastContext)!;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

    const show = useCallback((message: string, type: 'success' | 'error') => {
        const id = Math.random().toString(36).substring(2);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000);
    }, []);

    useEffect(() => {
        registerToast({ show });
    }, [show]);
    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div className="fixed bottom-6 right-6 space-y-3 z-[9999]">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
          relative flex items-start gap-3 px-4 py-3 pr-3 rounded-lg shadow-md text-white text-sm max-w-xs overflow-hidden
          animate-slide-in
          ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
        `}
                    >
                        <span>{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="ml-auto">
                            <X className="w-4 h-4" />
                        </button>

                        {/* Progress timeline bar */}
                        <span
                            className={`
            absolute bottom-0 left-0 h-1 bg-white/50 animate-timeline
          `}
                            style={{ width: '100%' }}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>

    );
};
