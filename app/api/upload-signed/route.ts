// app/api/upload-signed/route.ts

import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = (await request.json()) as HandleUploadBody;

        // TODO: Add authentication check here (e.g., verify user session)

        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                const token = process.env.BLOB_READ_WRITE_TOKEN;
                if (!token) {
                    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
                }

                return {
                    allowedContentTypes: ['image/*', 'video/*'],
                    tokenPayload: JSON.stringify({ pathname }),
                    allowOverwrite: true,
                    access: 'public',
                };
            },
            onUploadCompleted: async ({ blob }) => {
                console.log('Blob upload completed:', blob.url);
                console.log('It worked')
                // Optionally log to a database or trigger further actions
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (err) {
        console.error('Signed URL error:', err);
        return NextResponse.json({ error: 'Server error: ' + (err as Error).message }, { status: 500 });
    }
}