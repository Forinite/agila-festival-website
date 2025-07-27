// app/api/queen/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient, uploadMediaToSanity } from '@/sanity/lib/sanityClient';
import { v4 as uuid } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get('name') as string;
        const year = parseInt(formData.get('year') as string);
        const role = formData.get('role') as string;
        const bio = formData.get('bio') as string;
        const file = formData.get('image') as File;

        if (!name || !year || !role || !file) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const asset = await uploadMediaToSanity(file);

        const result = await sanityWriteClient.create({
            _type: 'queen',
            name,
            year,
            role,
            bio, // ✅ new
            imageUrl: {
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id },
            },
            id: uuid(),
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error in queen POST route:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
