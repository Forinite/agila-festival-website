import React from "react";

interface ConfirmDialogProps {
    open: boolean;
    message?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({
                           open,
                           message = "Are you sure you want to proceed?",
                           onCancel,
                           onConfirm
                       }: ConfirmDialogProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-neutral-900 text-white rounded-lg shadow-xl p-6 max-w-sm w-full">
                <p className="text-sm mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="text-sm text-gray-400 hover:text-white"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
