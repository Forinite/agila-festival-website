import { NextResponse } from 'next/server';
import {sanityWriteClient} from '@/sanity/lib/sanityClient';

// POST /api/queen/update
export async function POST(req: Request) {
   console.log('attempt acknowledged');
    try {
        console.log('works Here!')
        const formData = await req.formData();
        console.log('Got FormData')
        console.log(formData);
        const id = formData.get('_id')?.toString();
        const name = formData.get('name')?.toString();
        const year = formData.get('year')?.toString();
        const role = formData.get('role')?.toString();

        if (!id || !name || !year || !role) {
            console.error('Missing data:', { id, name, year, role });
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await sanityWriteClient
            .patch(id)
            .set({ name, year: parseInt(year), role })
            .commit();

        return NextResponse.json({ message: 'Queen updated', data: result });

    } catch (err: any) {
        console.log('Nothing gotten!');
        console.error('API UPDATE ERROR:', err.message, err.stack);
        return NextResponse.json({ error: 'Failed to update queen' }, { status: 500 });
    }
}
