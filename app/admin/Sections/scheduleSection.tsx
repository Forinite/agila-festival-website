import React from 'react';
import AdminScheduleCard from '@/app/components/ui/adminUI/adminScheduleCard';
import { useSchedules } from '@/app/hooks/useSchedules';
import ScheduleFormModal from '@/app/components/ui/adminUI/scheduleForrmModal';
import ConfirmModal from "@/app/components/ui/adminUI/modalConfirm";

const ScheduleSection = () => {
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [activeSchedule, setActiveSchedule] = React.useState(null);
    const [activeScheduleId, setActiveScheduleId] = React.useState('');

    const { schedules, loading, error, refetch } = useSchedules();

    const handleEditClick = (schedule) => {
        setActiveSchedule(schedule);
        setEditModalOpen(true);
    };

    const handleAddClick = () => {
        setAddModalOpen(true);
    };

    const clearFormData = {
        title: '',
        desc: '',
        date: '',
        schedule: [{ time: '', event: '' }]
    };

    const handleAddSchedule = async (formData) => {
        try {
            await fetch('/api/schedule/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setAddModalOpen(false);
            refetch()

        } catch (error) {
            console.error('Add Schedule Error:', error);
        }
    };

    const handleUpdateSchedule = async (formData) => {
        try {
            await fetch('/api/schedule/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setEditModalOpen(false);
            refetch()
        } catch (error) {
            console.error('Update Schedule Error:', error);
        }
    };

    const handleDelete = async (_id: string) => {
        setActiveScheduleId(_id)
        setDeleteModalOpen(true)

    };
    const handleConfirmDelete = async () => {
        try {
            await fetch('/api/schedule/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: activeScheduleId }),
            });
            refetch();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete schedule. Please try again.')
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
                { schedules.map((item, index) => (
                    <AdminScheduleCard
                        key={index}
                        item={item}
                        schedule={item.schedule}
                        description={item.desc}
                        title={item.title}
                        date={item.date}
                        onEdit={() => handleEditClick(item)}
                        onDelete={() => handleDelete(item._id)}
                    />
                )) }

            </div>
             <ConfirmModal title={'Delete This Schedule?'} onConfirm={handleConfirmDelete} onCancel={() => {
                 setDeleteModalOpen(false);
             }} isOpen={deleteModalOpen} />

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

