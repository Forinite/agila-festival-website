// app/types/queen.ts
export interface Queen {
    _id: string;
    name: string;
    year: number;
    role?: string; // Made optional to avoid TS2741
    imageUrl: string | null;
    bio?: string;
}