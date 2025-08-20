import { NextResponse } from 'next/server';
import { sanityWriteClient, uploadMediaToSanity } from '@/sanity/lib/sanityClient';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const id = formData.get('_id')?.toString();
        const name = formData.get('name')?.toString();
        const year = formData.get('year')?.toString();
        const role = formData.get('role')?.toString();
        const bio = formData.get('bio')?.toString(); // ✅ Add this line
        const imageBlob = formData.get('image') as Blob | null;

        if (!id || !name || !year || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
//{ name:string, year:number, role:string,  bio:string|undefined }
        const patch: Record<string, string|number|undefined|{
            _type: string;
            asset: {
                _type: string;
                _ref: string;
            };
        }> = {
            name,
            year: parseInt(year),
            role,
            bio, // ✅ Add bio to patch
        };

        if (imageBlob && imageBlob.size > 0) {
            const imageFile = new File([imageBlob], 'upload.jpg', { type: imageBlob.type });
            const asset = await uploadMediaToSanity(imageFile);

            patch.imageUrl = {
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id },
            };
        }

        const result = await sanityWriteClient.patch(id).set(patch).commit();

        return NextResponse.json({ message: 'Queen updated', data: result });

    } catch (err) {
        console.error('Queen update error:', err);
        return NextResponse.json({ error: 'Failed to update queen' }, { status: 500 });
    }
}
