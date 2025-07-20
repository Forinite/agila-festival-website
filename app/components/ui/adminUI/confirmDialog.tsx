'use client';
import React, {useState} from "react";

interface ConfirmDialogProps {
    open: boolean;
    loading?: boolean;
    title?: string;
    message?: string;
    onCancel: () => void;
    onConfirm: () => void;
    setLoading: () => void;

}

const ConfirmDialog = ({
                           open,
                           title,
                           message = "Are you sure you want to proceed?",
                           onCancel,
                           onConfirm,
                       }: ConfirmDialogProps) => {

    const [loading, setLoading] = useState(false);
    if (!open) return null;




    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="bg-neutral-900 text-white rounded-lg shadow-xl p-6 max-w-sm w-full">
                {title && (
                    <h3 className="text-base font-semibold text-white mb-2">
                        {title}
                    </h3>
                )}
                <p className="text-sm text-gray-300 mb-6">{message}</p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="text-sm px-4 py-2 text-gray-400 hover:text-white transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setLoading(true)
                            onConfirm()
                        }}
                        className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition cursor-pointer disabled:bg-red-900 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading? 'Loading...' : 'Confirm' }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
