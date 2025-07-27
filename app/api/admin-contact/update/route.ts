import {sanityWriteClient, uploadMediaToSanity} from '@/sanity/lib/sanityClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const _id = formData.get('_id')?.toString();
        const name = formData.get('name')?.toString();
        const title = formData.get('title')?.toString();
        const phone = formData.get('phone')?.toString();
        const email = formData.get('email')?.toString();
        const imageFile = formData.get('image') as File;

        if (!_id || !name || !title || !phone || !email) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const updatePayload: any = { name, title, phone, email };

        if (imageFile && imageFile.size > 0) {
            const uploadedImage = await uploadMediaToSanity(imageFile);
            updatePayload.image = { asset: { _type: 'reference', _ref: uploadedImage._id } };
        }

        const result = await sanityWriteClient.patch(_id).set(updatePayload).commit();

        return NextResponse.json({ message: 'Contact updated', data: result });
    } catch (err) {
        console.error('Update contact error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
