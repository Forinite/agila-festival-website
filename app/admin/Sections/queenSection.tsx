import React, { useState } from "react";
import QueenCard from "@/app/components/ui/adminUI/queenCard";
import {currentQueen, pastQueensData} from "@/app/constants/pastQueens";
import QueenFormModal from "@/app/components/ui/adminUI/queenFormModal";
import ConfirmDialog from "@/app/components/ui/adminUI/confirmDialog"; // Assuming you've split them already


export const QueenSection = () => {
    const [queens, setQueens] = useState(pastQueensData);
    const [queenToEdit, setQueenToEdit] = useState(null);
    const [queenToDelete, setQueenToDelete] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleDelete = () => {
        if (!queenToDelete) return;
        setQueens((prev) => prev.filter((q) => q.name !== queenToDelete.name));
        setQueenToDelete(null);
        setConfirmOpen(false);
    };

    const handleUpdateQueen = (updatedQueen) => {
        setQueens((prev) =>
            prev.map((queen) => (queen.name === updatedQueen.name ? updatedQueen : queen))
        );
        setQueenToEdit(null);
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
                    + Add <span className="hidden md:inline">New Queen</span>
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
                />
            )}
            {isAddModalOpen && (
                <QueenFormModal
                    mode="add"
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddQueen}
                />
            )}

        </div>
    );
};

;
