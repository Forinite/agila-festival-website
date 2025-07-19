import { sanityWriteClient } from '@/sanity/lib/sanityClient';

export async function POST(req: Request) {
    const data = await req.formData();
    const file = data.get('file') as File;

    if (!file) {
        return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const asset = await sanityWriteClient.assets.upload('image', file, {
        contentType: file.type,
        filename: file.name,
    });

    return new Response(JSON.stringify({ asset }));
}
