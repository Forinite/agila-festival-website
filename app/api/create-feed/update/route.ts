// import { NextResponse } from 'next/server';
// import {sanityWriteClient} from "@/sanity/lib/sanityClient";
//
// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const {
//             id,
//             title,
//             description,
//             category,
//         } = body;
//
//         if (!id) {
//             return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
//         }
//
//         const updated = await sanityWriteClient.patch(id)
//             .set({
//                 title,
//                 description,
//                 category,
//             })
//             .commit();
//
//         return NextResponse.json({ message: 'Feed Info updated', updated });
//     } catch (err) {
//         console.error('Update failed:', err);
//         return NextResponse.json({ error: 'Failed to update feed info' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            id,
            title,
            description,
            category,
        } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
        }

        const updated = await sanityWriteClient.patch(id)
            .set({
                title,
                description,
                category,
            })
            .commit();

        return NextResponse.json({ message: 'Contact info updated', updated });
    } catch (err) {
        console.error('Update failed:', err);
        return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
    }
}
