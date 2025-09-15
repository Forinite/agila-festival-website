// // app/api/sanity-upload-url/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { sanityWriteClient } from "@/sanity/lib/sanityClient";
//
// export async function POST(req: NextRequest) {
//     try {
//         const { fileType, fileName } = await req.json();
//
//         if (!fileType) {
//             return NextResponse.json({ error: "Missing fileType" }, { status: 400 });
//         }
//
//         const uploadType = fileType.startsWith("video/") ? "file" : "image";
//
//         // Ask Sanity for a direct upload URL
//         const { signedUploadUrl, documentId } = await sanityWriteClient.assets
//             .upload(uploadType, null as any, {
//                 contentType: fileType,
//                 filename: fileName || "upload",
//                 directUpload: true,
//             });
//
//         return NextResponse.json({ signedUploadUrl, documentId });
//     } catch (err) {
//         console.error("Signed upload error:", err);
//         return NextResponse.json({ error: "Failed to get upload URL" }, { status: 500 });
//     }
// }
