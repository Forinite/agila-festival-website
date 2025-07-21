import { NextRequest, NextResponse } from 'next/server';
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: NextRequest) {
    try {
        const { _id, title, desc, date, schedule } = await req.json();

        if (!_id) {
            return NextResponse.json({ error: 'Missing schedule ID' }, { status: 400 });
        }

        const updatedDoc = await sanityWriteClient.patch(_id).set({
            title,
            desc,
            date,
            schedule,
        }).commit();

        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error('Error updating schedule:', error);
        return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }
}
