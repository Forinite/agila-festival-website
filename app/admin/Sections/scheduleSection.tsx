// app/admin/Sections/ScheduleSection.tsx
'use client';
import React, { useState } from 'react';
import AdminScheduleCard from '@/app/components/ui/adminUI/adminScheduleCard';
import { useSchedules } from '@/app/hooks/useSchedules';
import ScheduleFormModal from '@/app/components/ui/adminUI/scheduleForrmModal';
import ConfirmModal from '@/app/components/ui/adminUI/modalConfirm';
import { toast } from '@/lib/toast';
import { Schedule } from '@/app/types/schedule';

const ScheduleSection = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activeSchedule, setActiveSchedule] = useState<Schedule | null>(null);
    const [activeScheduleId, setActiveScheduleId] = useState<string>('');

    const { schedules, loading, error, refetch } = useSchedules();

    const handleEditClick = (schedule: Schedule) => {
        setActiveSchedule(schedule);
        setEditModalOpen(true);
    };

    const handleAddClick = () => {
        setAddModalOpen(true);
    };

    const clearFormData: Schedule = {
        _id: '',
        title: '',
        desc: '',
        date: '',
        schedule: [{ time: '', event: '' }],
    };

    const handleAddSchedule = async (formData: Schedule) => {
        try {
            const response = await fetch('/api/schedule/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result: { success: boolean; schedule?: Schedule; error?: string } = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to add schedule');
            }

            setAddModalOpen(false);
            toast.success('Schedule added successfully.');
            refetch();
        } catch (error) {
            toast.error('Failed to add schedule. Please try again.');
            console.error('Add Schedule Error:', error);
        }
    };

    const handleUpdateSchedule = async (formData: Schedule) => {
        try {
            const response = await fetch('/api/schedule/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result: { success: boolean; schedule?: Schedule; error?: string } = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to update schedule');
            }

            setEditModalOpen(false);
            toast.success('Schedule updated successfully.');
            refetch();
        } catch (error) {
            toast.error('Failed to update schedule. Please try again.');
            console.error('Update Schedule Error:', error);
        }
    };

    const handleDelete = (id: string) => {
        setActiveScheduleId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch('/api/schedule/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: activeScheduleId }),
            });

            const result: { success: boolean; error?: string } = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to delete schedule');
            }

            toast.success('Schedule deleted successfully.');
            refetch();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete schedule. Please try again.');
        } finally {
            setDeleteModalOpen(false);
            setActiveScheduleId('');
        }
    };

    if (loading) return <p>Loading schedules...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="md:text-2xl font-bold">Event Schedule</h2>
                <button
                    onClick={handleAddClick}
                    className="md:text-base text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {schedules.map((item: Schedule) => (
                    <AdminScheduleCard
                        key={item._id}
                        schedule={item.schedule}
                        description={item.desc}
                        title={item.title}
                        date={item.date}
                        onEdit={() => handleEditClick(item)}
                        onDelete={() => handleDelete(item._id)}
                    />
                ))}
            </div>

            <ConfirmModal
                title="Delete This Schedule?"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setDeleteModalOpen(false);
                    setActiveScheduleId('');
                }}
                isOpen={deleteModalOpen}
            />

            {editModalOpen && (
                <ScheduleFormModal
                    initialData={activeSchedule}
                    onSubmit={handleUpdateSchedule}
                    onClose={() => setEditModalOpen(false)}
                    mode="edit"
                />
            )}

            {addModalOpen && (
                <ScheduleFormModal
                    initialData={clearFormData}
                    onSubmit={handleAddSchedule}
                    onClose={() => setAddModalOpen(false)}
                    mode="add"
                />
            )}
        </div>
    );
};

export default ScheduleSection;