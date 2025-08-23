// app/admin/Sections/QueenSection.tsx
'use client';
import React, { useEffect, useState } from 'react';
import QueenCard from '@/app/components/ui/adminUI/queenCard';
import QueenFormModal from '@/app/components/ui/adminUI/queenFormModal';
import ConfirmDialog from '@/app/components/ui/adminUI/confirmDialog';
import { useQueens } from '@/app/hooks/useQueens';
import { toast } from '@/lib/toast';
import { Queen } from '@/app/types/queen';

export const QueenSection = () => {
    const { currentQueen, pastQueens, loading, refetch } = useQueens();
    const [queens, setQueens] = useState<Queen[]>([]);
    const [queenToEdit, setQueenToEdit] = useState<Queen | null>(null);
    const [queenToDelete, setQueenToDelete] = useState<Queen | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        if (!loading && pastQueens.length > 0) {
            // Only update queens if pastQueens has changed
            setQueens((prevQueens) => {
                // Perform a deep comparison to avoid unnecessary updates
                if (JSON.stringify(prevQueens) !== JSON.stringify(pastQueens)) {
                    return pastQueens;
                }
                return prevQueens;
            });
        }
    }, [loading, pastQueens]);

    if (loading) return <p>Loading Leaders...</p>;

    const handleDelete = async () => {
        if (!queenToDelete) return;
        try {
            const id = queenToDelete._id;
            const res = await fetch('/api/queen/deletion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                toast.error('Failed to delete Leader');
                throw new Error('Failed to delete');
            }

            toast.success('Leader deleted successfully');
            setQueens((prev) => prev.filter((q) => q._id !== id));
            refetch();
        } catch (err) {
            console.error('Delete failed:', err);
            toast.error('Could not delete leader');
        }
        setQueenToDelete(null);
        setConfirmOpen(false);
    };

    const handleUpdateQueen = () => {
        refetch();
    };

    const handleAddQueen = (newQueen: Queen) => {
        setQueens((prev) => [...prev, newQueen]);
        setIsAddModalOpen(false);
        refetch();
    };

    return (
        <div className="relative">
            <div className="w-full mt-4 text-right">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                    + Add <span className="hidden md:inline">New Leader</span>
                </button>
            </div>

            <div className="w-full">
                {currentQueen && (
                    <QueenCard
                        queen={currentQueen}
                        isCurrent={true}
                        onEdit={() => setQueenToEdit(currentQueen)}
                        onDelete={() => {
                            setQueenToDelete(currentQueen);
                            setConfirmOpen(true);
                        }}
                    />
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {queens.map((queen) => (
                    <QueenCard
                        key={queen._id}
                        queen={queen}
                        onEdit={() => setQueenToEdit(queen)}
                        onDelete={() => {
                            setQueenToDelete(queen);
                            setConfirmOpen(true);
                        }}
                    />
                ))}
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title={`Remove ${queenToDelete?.name || 'Leader'}?`}
                message="This action cannot be undone."
                onCancel={() => {
                    setConfirmOpen(false);
                    setQueenToDelete(null);
                }}
                onConfirm={handleDelete}
            />

            {queenToEdit && (
                <QueenFormModal
                    mode="edit"
                    initialData={queenToEdit}
                    onClose={() => setQueenToEdit(null)}
                    onSubmit={handleUpdateQueen}
                    refetch={refetch}
                />
            )}
            {isAddModalOpen && (
                <QueenFormModal
                    mode="add"
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddQueen}
                    refetch={refetch}
                />
            )}
        </div>
    );
};