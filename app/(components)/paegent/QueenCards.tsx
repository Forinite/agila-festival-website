// 'use client'
// import React from 'react'
// import QueenCard from "@/app/components/ui/queenCard";
// import { useQueens } from '@/app/hooks/useQueens';
//
// export const QueenCards = () => {
//     const { pastQueens, loading } = useQueens();
//     if (loading) return <p>Loading queens...</p>;
//
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {pastQueens.map((queen) => (
//                 <QueenCard
//                     key={queen.year}
//                     name={queen.name}
//                     year={queen.year}
//                     role={queen.role}
//                     imageUrl={queen.imageUrl}
//                 />
//             ))}
//         </div>
//     )
// }
//
