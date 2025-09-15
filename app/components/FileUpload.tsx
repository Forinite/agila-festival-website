// components/FileUpload.tsx
import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            // Step 1: Get signed URL from the server
            const response = await fetch('/api/get-upload-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type,
                }),
            });
            const { url, fields } = await response.json();

            // Step 2: Prepare form data for the upload
            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append('file', file);

            // Step 3: Upload the file directly to Vercel Blob
            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                alert('File uploaded successfully');
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {progress > 0 && <progress value={progress} max={100} />}
        </div>
    );
}
