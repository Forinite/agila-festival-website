import React from "react";
import Image from "next/image";
import {NoImage} from "@/app/constants";

interface Queen {
    name: string;
    year: string;
    role: string;
    bio: any;
    imageUrl?: string | null;
}

interface QueenCardProps {
    queen: Queen;
    isCurrent?: boolean;
    onEdit?: (queen: Queen) => void;
    onDelete?: () => void;
}

const QueenCard = ({ queen, isCurrent = false, onEdit, onDelete }: QueenCardProps) => {
    const imageSrc = queen.imageUrl ?? NoImage; // fallback image

    return (
        <div className={`border p-4 rounded-lg bg-white text-black shadow-md ${isCurrent ? 'border-indigo-500 max-w-[500px] mx-auto' : 'border-gray-300'}`}>
            <div className={`relative w-full ${isCurrent ? 'md:h-80 h-56' : 'md:h-56 h-40'} rounded overflow-hidden mb-4`}>
                <Image
                    src={imageSrc}
                    alt={`${queen.name || "Leader"}'s photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="space-y-1">
                <h2 className="text-lg font-bold">{queen.name}</h2>
                <p className="text-sm text-gray-500">
                    Reign: {queen.year} - {isCurrent ? 'till date' : parseInt(queen.year) + 1}
                </p>
                {/* <p className="text-sm mt-2">{queen.role}</p> */}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    onClick={() => onEdit?.(queen)}
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer"
                >
                    ✏️ Edit
                </button>
                {!isCurrent && (
                    <button
                        onClick={onDelete}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                        🗑️ Remove
                    </button>
                )}
            </div>

            {isCurrent && (
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">
                    👑 Current
                </div>
            )}
        </div>
    );
};

export default QueenCard;
