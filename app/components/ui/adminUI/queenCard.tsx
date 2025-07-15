// import React from 'react';
// import Image from 'next/image';
//
// interface QueenCardProps {
//     name: string;
//     year: string;
//     role: string;
//     imageUrl: string;
//     isCurrent?: boolean;
//     onEdit?: () => void;
// }
//
//  const QueenCard: React.FC<QueenCardProps> = ({ name, year, role, imageUrl, isCurrent = false, onEdit }) => {
//     return (
//         <div className={`border p-4 rounded-lg bg-white text-black shadow-md ${isCurrent ? 'border-indigo-500 max-w-[500px] mx-auto' : 'border-gray-300'}`}>
//             <div className={`relative w-full ${isCurrent? 'h-80': ' h-56'} rounded overflow-hidden mb-4`}>
//                 <Image src={imageUrl} alt={`${name}'s photo`} fill className="object-cover" />
//             </div>
//             <h2 className="text-lg font-bold">{name}</h2>
//             <p className="text-sm text-gray-500">Reign: {year}</p>
//             <p className="text-sm mt-2">{role}</p>
//
//             {isCurrent && onEdit && (
//                 <button onClick={onEdit} className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer">
//                     Edit Info
//                 </button>
//             )}
//         </div>
//     );
// };
//
// export default QueenCard


import React from "react";
import Image from "next/image";

interface Queen {
    name: string;
    year: string;
    role: string;
    imageUrl: string;
}

interface QueenCardProps {
    queen: Queen;
    isCurrent?: boolean;
    onEdit?: (queen: Queen) => void;
    onDelete?: () => void;
}

const QueenCard = ({ queen, isCurrent = false, onEdit, onDelete }: QueenCardProps) => {
    return (
        <div className={`border p-4 rounded-lg bg-white text-black shadow-md ${isCurrent ? 'border-indigo-500   max-w-[500px] mx-auto' : 'border-gray-300'} `} >
            <div className={`relative w-full ${isCurrent? 'md:h-80 h-56': ' md:h-56 h-40'} rounded overflow-hidden mb-4`}>
                <Image src={queen.imageUrl} alt={`${queen.name}'s photo`} fill className="object-cover" />
            </div>


            <div className="space-y-1">
                <h2 className="text-lg font-bold">{queen.name}</h2>
                <p className="text-sm text-gray-500">Reign: {queen.year}</p>
                <p className="text-sm mt-2">{queen.role}</p>
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
