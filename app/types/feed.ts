export interface Feed {
    id: string;
    title: string;
    media: string;
    isVideo?: boolean;
    description: string;
    category: string[];
    mediaAssetId?: string; // Optional to match Sanity data
}