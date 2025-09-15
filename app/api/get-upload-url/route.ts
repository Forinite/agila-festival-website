// app/api/get-uploaded-url/route.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSignedUrl } from '@vercel/blob/server';
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { filename, contentType } = req.body;
//
//         try {
//             const { url, fields } = await getSignedUrl('put', filename, {
//                 contentType,
//                 access: 'public',
//             });
//
//             res.status(200).json({ url, fields });
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to generate signed URL' });
//         }
//     } else {
//         res.status(405).json({ error: 'Method Not Allowed' });
//     }
// }
