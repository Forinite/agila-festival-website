import { NextRequest, NextResponse } from 'next/server';
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: NextRequest) {
    try {
        const { _id } = await req.json();

        if (!_id) {
            return NextResponse.json({ error: 'Missing schedule ID' }, { status: 400 });
        }

        await sanityWriteClient.delete(_id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        return NextResponse.json({ error: 'Failed to delete schedule' }, { status: 500 });
    }
}
