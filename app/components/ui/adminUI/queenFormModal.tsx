import React, { useState } from "react";
import Image from "next/image";

const QueenFormModal = ({ mode = "add", initialData = {}, onClose, onSubmit }) => {
    const [name, setName] = useState(initialData.name || "");
    const [year, setYear] = useState(initialData.year || "");
    const [role, setRole] = useState(initialData.role || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        initialData.imageUrl || null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // Live preview
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !year || !role || (!imageFile && !initialData.imageUrl)) {
            alert("Please fill out all fields and upload an image.");
            return;
        }

        const queenData = {
            name,
            year,
            role,
            imageUrl: imageFile || initialData.imageUrl, // Could be File or existing URL
        };

        onSubmit(queenData);
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-md shadow-md p-6 w-[90%] max-w-md text-black"
            >
                <h2 className="text-xl font-semibold mb-4">
                    {mode === "edit" ? "Edit Queen" : "Add New Queen"}
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
                        type="text"
                        placeholder="Year"
                        className="w-full border p-2 rounded"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        className="w-full border p-2 rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                    />

                    {previewUrl && (
                        <div className="w-full h-40 rounded overflow-hidden">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                width={400}
                                height={400}
                                className="object-cover w-full h-full rounded"
                            />
                        </div>
                    )}
                </div>

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
                        {mode === "edit" ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QueenFormModal;
