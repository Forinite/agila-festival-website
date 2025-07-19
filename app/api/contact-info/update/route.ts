import { NextResponse } from 'next/server';
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            id,
            location,
            emails,
            phones,
            instagram,
            twitter,
            facebook,
            youtube,
        } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
        }

        const updated = await sanityWriteClient.patch(id)
            .set({
                location,
                emails,
                phones,
                instagram,
                twitter,
                facebook,
                youtube,
            })
            .commit();

        return NextResponse.json({ message: 'Contact info updated', updated });
    } catch (err) {
        console.error('Update failed:', err);
        return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
    }
}
