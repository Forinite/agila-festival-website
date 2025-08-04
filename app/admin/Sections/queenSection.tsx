'use client'
import React, {useEffect, useState} from "react";
import QueenCard from "@/app/components/ui/adminUI/queenCard";
import QueenFormModal from "@/app/components/ui/adminUI/queenFormModal";
import ConfirmDialog from "@/app/components/ui/adminUI/confirmDialog"; // Assuming you've split them already
import { useQueens } from '@/app/hooks/useQueens';
import {toast} from "@/lib/toast";



export  const  QueenSection  = () => {
    const { currentQueen, pastQueens, loading, refetch } = useQueens();
    const [queens, setQueens] = useState([]);
    const [queenToEdit, setQueenToEdit] = useState(null);
    const [queenToDelete, setQueenToDelete] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        if (!loading && pastQueens.length > 0) {
            setQueens(pastQueens);
        }
    }, [loading]);

    if (loading) return <p>Loading Leaders...</p>;


    const handleDelete = async () => {
        if (!queenToDelete) return;
        setQueens((prev) => prev.filter((q) => q.name !== queenToDelete.name));
        const id = queenToDelete?._id;
        console.log(id, queenToDelete)
        try {
            const res = await fetch('/api/queen/deletion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })

            if (!res.ok){
                toast.error('Failed to delete Leader')
                throw new Error('Failed to delete')
            }

            toast.success('Leader deleted successfully')

            // Optimistically update local state/UI
            // setQueens((prev) => prev.filter((item) => item._id !== id))
        } catch (err) {
            console.error('Delete failed:', err)
            toast.error('Could not delete queen')
        }
        setQueenToDelete(null);
        setConfirmOpen(false);
    };

    const handleUpdateQueen = (updatedQueen) => {
        refetch()
    };

    const handleAddQueen = (newQueen) => {
        setQueens((prev) => [...prev, newQueen]);
        setIsAddModalOpen(false);
    };


    return (
        <div className="relative">
            <div className="w-full  mt-4 text-right">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                    + Add <span className="hidden md:inline">New Leader</span>
                </button>
            </div>

            <div className={'w-full'}>
                <QueenCard
                    queen={currentQueen}
                    isCurrent={true}
                    onEdit={() => setQueenToEdit(currentQueen)}
                    onDelete={() => {
                        setQueenToDelete(currentQueen);
                        setConfirmOpen(true);
                    }}
                />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                {queens.map((queen) => (
                    <QueenCard
                        key={queen.name}
                        queen={queen}
                        onEdit={() => setQueenToEdit(queen)}
                        onDelete={() => {
                            setQueenToDelete(queen);
                            setConfirmOpen(true);
                        }}
                    />
                ))}
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={confirmOpen}
                title={`Remove ${queenToDelete?.name}?`}
                message="This action cannot be undone."
                onCancel={() => {
                    setConfirmOpen(false);
                    setQueenToDelete(null);
                }}
                onConfirm={handleDelete}
            />

            {/* Queen Edit Modal */}
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

;
