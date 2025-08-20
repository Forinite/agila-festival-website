'use client';

import React, {useState} from 'react';

interface ConfirmModalProps {
    title: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
                                                       title,
                                                       description,
                                                       onConfirm,
                                                       onCancel,
                                                       isOpen
                                                   }) => {
    const [clicked, setClicked] = useState(false);

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setClicked(true);
                            onConfirm()
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={clicked}
                    >
                        {clicked? 'Deleting...' : 'Yes, Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
