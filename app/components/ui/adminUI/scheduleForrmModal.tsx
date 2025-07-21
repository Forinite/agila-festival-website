'use client';

import React, { useState } from 'react';

interface ScheduleItem {
    time: string;
    event: string;
}

interface ScheduleData {
    title: string;
    desc: string;
    date: string;
    schedule: ScheduleItem[];
}

interface Props {
    initialData: ScheduleData;
    onSubmit: (updated: ScheduleData) => Promise<void> | void;
    onClose: () => void;
    mode: string;
}

const ScheduleFormModal: React.FC<Props> = ({ initialData, onSubmit, onClose, mode }) => {
    const [formData, setFormData] = useState<ScheduleData>(initialData || {
        title: '',
        desc: '',
        date: '',
        schedule: [{ time: '', event: '' }]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleScheduleChange = (index: number, field: keyof ScheduleItem, value: string) => {
        const updatedSchedule = [...formData.schedule];
        updatedSchedule[index][field] = value;
        setFormData(prev => ({ ...prev, schedule: updatedSchedule }));
    };

    const addScheduleItem = () => {
        setFormData(prev => ({
            ...prev,
            schedule: [...prev.schedule, { time: '', event: '' }],
        }));
    };

    const removeScheduleItem = (index: number) => {
        const updated = [...formData.schedule];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, schedule: updated }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.desc.trim() || !formData.date.trim()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            // Optionally, reset formData here if mode === 'add'
        } catch (err) {
            console.error('Form submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed top-0 inset-0 bg-black/40 backdrop-blur-sm z-50  px-4 h-screen overflow-y-scroll">
            <div className="flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl p-6 w-full max-w-2xl text-gray-800 shadow-xl"
                >
                    <h3 className="text-xl font-bold mb-6 text-center">
                        {mode === 'edit' ? 'Edit' : 'Add'} Schedule
                    </h3>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2  md:text-base text-xs"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="w-full md:min-h-auto min-h-40 border border-gray-300 rounded-md px-3 py-2 md:text-base text-xs "
                        />
                    </div>

                    {/* Date */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2  md:text-base text-xs"
                        />
                    </div>

                    {/* Schedule Items */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Schedule</label>
                        {formData.schedule.map((item, index) => (
                            <div key={index} className="md:flex items-center gap-4 mb-3 ">
                                <input
                                    placeholder="Time"
                                    value={item.time}
                                    onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                                    className="md:flex-1 border border-gray-300 rounded-md px-3 py-2  md:text-base text-xs md:mr-0 mr-4 md:mt-3 mb-3 max-w-full"
                                />
                                <input
                                    placeholder="Event"
                                    value={item.event}
                                    onChange={(e) => handleScheduleChange(index, 'event', e.target.value)}
                                    className="md:flex-[2] border border-gray-300 rounded-md px-3 py-2  md:text-base text-xs  max-w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeScheduleItem(index)}
                                    className="text-red-500 hover:text-red-700 md:text-sm text-xs md:inline block"
                                >
                                    <span className="inline">Remove</span>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addScheduleItem}
                            className="mt-2 md:px-4 px-2 py-1 border rounded md:text-sm text-[10px] text-indigo-600 border-indigo-400 hover:bg-indigo-50"
                        >
                            + Add Schedule Item
                        </button>
                    </div>

                    {/* Actions */}
                    <div className=" justify-end gap-4 md:text-base text-[10px]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded min-w-min inline w-full md:w-fit my-1 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded min-w-min inline w-full md:w-fit my-1 cursor-pointer disabled:bg-indigo-900 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleFormModal;

