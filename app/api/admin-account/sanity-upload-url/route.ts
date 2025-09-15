// app/api/sanity-upload-url/route.ts
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_WRITE_TOKEN!, // needs write token
    apiVersion: "2025-07-15",
    useCdn: false,
});

export async function POST(req: Request) {
    try {
        const { fileType } = await req.json();

        const endpoint =
            fileType.startsWith("video")
                ? "assets/videos"
                : "assets/images";

        const res = await fetch(
            `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/${client.config().dataset}/${endpoint}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.SANITY_WRITE_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Sanity supports direct upload with "file" field, but here we want signed URL
                    // 👇 This tells Sanity we're preparing for a direct upload
                    _type: "sanity.assetUpload",
                    mimeType: fileType,
                }),
            }
        );

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
