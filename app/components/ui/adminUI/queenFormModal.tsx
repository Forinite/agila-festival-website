import React, { useState } from "react";
import {toast} from "@/lib/toast";



const QueenFormModal = ({ mode, initialData = {}, onClose, onSubmit, refetch }) => {
    const [name, setName] = useState(initialData.name || "");
    const [year, setYear] = useState(initialData.year || "");
    const [role, setRole] = useState(initialData.role || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        initialData.imageUrl || null
    );
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState(initialData.bio || "");


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // Live preview
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        // Validate required fields
        if (!name || !year || !role || (mode !== 'edit' && !imageFile)) {
            alert("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", name);
            data.append("year", year);
            data.append("role", role);
            data.append("bio", bio);


            if (mode === 'edit') {
                console.log('edit mode');
                data.append('_id', initialData._id);
            }
            console.log(mode);

            console.log(initialData._id);

            // Only append image if user selected a new one
            if (imageFile) {
                data.append("image", imageFile);
            }


            const endpoint = mode === "edit" ? "/api/queen/update" : "/api/queen";

            const res = await fetch(endpoint, {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error("API error");


            toast.success(mode === "edit" ? "Leader updated successfully" : "Leader added successfully");
            onClose();
            onSubmit();
        } catch (err) {
            console.error("Error saving leader:", err);
            toast.error("There was an error processing the leader data.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-md shadow-md p-6 w-[90%] max-w-md text-black"
            >
                <h2 className="text-xl font-semibold mb-4">
                    {mode === "edit" ? "Edit Leader" : "Add New Leader"}
                </h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border p-2 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        className="w-full border p-2 rounded"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Role"*/}
                    {/*    className="w-full border p-2 rounded"*/}
                    {/*    value={role}*/}
                    {/*    onChange={(e) => setRole(e.target.value)}*/}
                    {/*/>*/}
                    {/*<textarea*/}
                    {/*    placeholder="Biography (Markdown supported)"*/}
                    {/*    className="w-full border p-2 rounded min-h-[120px]"*/}
                    {/*    value={bio}*/}
                    {/*    onChange={(e) => setBio(e.target.value)}*/}
                    {/*/>*/}


                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                    />
                    <p className="text-xs text-gray-500 italic">
                        {mode === 'edit' ? 'Leave empty to keep current image' : 'Upload an image'}
                    </p>

                    {previewUrl && (
                        <div className="w-full h-40 rounded overflow-hidden">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                width={400}
                                height={400}
                                className="object-cover w-full h-full rounded"
                            />
                        </div>
                    )}



                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default QueenFormModal;
