//app/types/feed.ts

export interface Feed {
    id: string;
    title: string;
    description: string;
    category: string[];
    media: string;
    isVideo: boolean;
    mediaAssetId?: string;
    blobUrl?: string; // Optional, for Vercel Blob URLs
}