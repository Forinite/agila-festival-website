// app/api/create-feed/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/sanityClient";

export async function POST(req: NextRequest) {
    try {
        const { title, description, category, assetId } = await req.json();

        if (!title || !description || !category || !assetId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const newFeed = await sanityWriteClient.create({
            _type: "feedItem",
            title,
            description,
            category,
            media: {
                _type: "file",
                asset: {
                    _type: "reference",
                    _ref: assetId,
                },
            },
        });

        return NextResponse.json({ success: true, feed: newFeed });
    } catch (err) {
        console.error("Error creating feed:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
