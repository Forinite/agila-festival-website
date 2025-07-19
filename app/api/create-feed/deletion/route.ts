// /app/api/create-feed/delete/route.ts
import { NextResponse } from 'next/server'
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: Request) {
    try {
        const { id } = await req.json()

        if (!id) return NextResponse.json({ error: 'Feed ID is required' }, { status: 400 })

        await sanityWriteClient.delete(id)

        return NextResponse.json({ message: 'Feed deleted successfully', id })
    } catch (err) {
        console.error('Delete error:', err)
        return NextResponse.json({ error: 'Failed to delete feed' }, { status: 500 })
    }
}
