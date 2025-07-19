// /app/api/queen/deletion/route.ts
import { NextResponse } from 'next/server'
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: Request) {
    try {
        const { id } = await req.json()

        if (!id) return NextResponse.json({ error: 'Queen ID is required' }, { status: 400 })

        await sanityWriteClient.delete(id)

        return NextResponse.json({ message: 'Queen Removed successfully', id })
    } catch (err) {
        console.error('Delete error:', err)
        return NextResponse.json({ error: 'Failed to Remove Queen' }, { status: 500 })
    }
}
