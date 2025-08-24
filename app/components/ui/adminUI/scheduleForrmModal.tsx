'use client';
import React, { useState } from 'react';
import { toast } from '@/lib/toast';
import { Schedule, ScheduleEvent } from '@/app/types/schedule';

interface ScheduleFormModalProps {
    mode: 'add' | 'edit';
    initialData: Schedule | null;
    onSubmit: (updated: Schedule) => Promise<void> | void;
    onClose: () => void;
}

const ScheduleFormModal: React.FC<ScheduleFormModalProps> = ({ initialData, onSubmit, onClose, mode }) => {
    const [formData, setFormData] = useState<Schedule>(
        initialData || {
            _id: '',
            title: '',
            desc: '',
            date: '',
            schedule: [{ time: '', event: '' }],
        }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'date') {
            // Normalize input to uppercase and trim spaces
            // const normalizedValue = value.toUpperCase().trim();
            // // Validate MMM DD format (e.g., DEC 27)
            // const dateRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(0?[1-9]|[12][0-9]|3[01])$/;
            // if (normalizedValue && !dateRegex.test(normalizedValue)) {
            //     toast.info('Date must be in MMM DD format (e.g., DEC 27).');
            //     return;
            // }
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleScheduleChange = (index: number, field: keyof ScheduleEvent, value: string) => {
        const updatedSchedule = [...formData.schedule];
        updatedSchedule[index][field] = value;
        setFormData((prev) => ({ ...prev, schedule: updatedSchedule }));
    };

    const addScheduleItem = () => {
        setFormData((prev) => ({
            ...prev,
            schedule: [...prev.schedule, { time: '', event: '' }],
        }));
    };

    const removeScheduleItem = (index: number) => {
        if (formData.schedule.length > 1) {
            const updated = [...formData.schedule];
            updated.splice(index, 1);
            setFormData((prev) => ({ ...prev, schedule: updated }));
        } else {
            toast.info('At least one schedule item is required.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.date.trim()) {
            toast.info('Title and date are required.');
            return;
        }

        // Re-validate date format on submit
        const dateRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(0?[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(formData.date.toUpperCase().trim())) {
            toast.info('Date must be in MMM DD format (e.g., DEC 27).');
            return;
        }

        const validSchedule = formData.schedule.every((item) =>  item.event.trim());
        if (!validSchedule) {
            toast.info('All schedule items must have an event description.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            if (mode === 'add') {
                setFormData({
                    _id: '',
                    title: '',
                    desc: '',
                    date: '',
                    schedule: [{ time: '', event: '' }],
                });
            }
        } catch (err) {
            console.error('Form submission error:', err);
            toast.error('There was an error processing the schedule data.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 w-full max-h-screen overflow-y-scroll max-w-lg text-gray-800 shadow-xl"
            >
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
                    {mode === 'edit' ? 'Edit Schedule' : 'Add Schedule'}
                </h3>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm md:text-base font-semibold text-gray-700 mb-2 bg-gray-50/50 px-3 py-1 rounded-md"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Schedule Title"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:border-indigo-600 transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="desc"
                            className="block text-sm md:text-base font-semibold text-gray-700 mb-2 bg-gray-50/50 px-3 py-1 rounded-md"
                        >
                            Description
                        </label>
                        <textarea
                            id="desc"
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Event Description"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base min-h-[100px] focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:border-indigo-600 transition-colors"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label
                            htmlFor="date"
                            className="block text-sm md:text-base font-semibold text-gray-700 mb-2 bg-gray-50/50 px-3 py-1 rounded-md"
                        >
                            Date
                        </label>
                        <input
                            id="date"
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            placeholder="MMM DD (e.g., DEC 27)"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:border-indigo-600 transition-colors"
                            aria-describedby="date-help"
                        />
                        <p id="date-help" className="text-xs text-gray-500 italic mt-1">
                            Enter date as month abbreviation and day (e.g., DEC 27).
                        </p>
                    </div>

                    {/* Schedule Items */}
                    <div>
                        <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2 bg-gray-50/50 px-3 py-1 rounded-md">
                            Schedule
                        </label>
                        {formData.schedule.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3 w-full"
                            >
                                <input
                                    placeholder="Time (e.g., 10:00 AM)"
                                    value={item.time}
                                    onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                                    className="flex-1 min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:border-indigo-600 transition-colors"
                                    aria-label={`Event time ${index + 1}`}
                                />
                                <input
                                    placeholder="Event Description"
                                    value={item.event}
                                    onChange={(e) => handleScheduleChange(index, 'event', e.target.value)}
                                    className="flex-[2] min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 hover:border-indigo-600 transition-colors"
                                    aria-label={`Event description ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeScheduleItem(index)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                                    disabled={formData.schedule.length === 1}
                                    aria-label={`Remove schedule item ${index + 1}`}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addScheduleItem}
                            className="mt-2 px-4 py-2 border border-indigo-400 text-indigo-600 rounded-md hover:bg-indigo-50 text-sm md:text-base transition-colors"
                        >
                            + Add Schedule Item
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm md:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md text-sm md:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleFormModal;