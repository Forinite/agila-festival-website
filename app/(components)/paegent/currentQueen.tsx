'use client'
import React from 'react'
import QueenCard from "@/app/components/ui/queenCard";
import { useQueens } from '@/app/hooks/useQueens';
import Image from "next/image";

export const QueenCards = () => {
    const { currentQueen, pastQueens, loading } = useQueens();
    if (loading) return <p>Loading queens...</p>;

    return (
        <Image
            src={currentQueen}
            alt="Face of Idoma 2023 winner"
            width={800}
            height={600}
            className="rounded-2xl shadow-xl w-full h-auto"
        />
    )
}
