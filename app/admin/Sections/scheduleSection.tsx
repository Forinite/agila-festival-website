import React from 'react'
import AdminScheduleCard from "@/app/components/ui/adminUI/adminScheduleCard";
import {scheduleData} from "@/app/constants/scheduleData";
import EditScheduleFormModal from "@/app/components/ui/adminUI/editScheduleForrmModal";

const ScheduleSection = () => {
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [activeSchedule, setActiveSchedule] = React.useState(null);
    const handleEditClick = (schedule) => {
        setActiveSchedule(schedule)
        setEditModalOpen(true);
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="md:text-2xl font-bold ">Event Schedule</h2>
                <button
                    onClick={handleEditClick}
                    className=" md:text-base text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Edit
                </button>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
                {
                    scheduleData.map((item, index) => (
                        <AdminScheduleCard key={index} item={item} schedule={item.schedule} description={item.desc} title={item.title} date={item.date} schedule={item.schedule} onEdit={()=>handleEditClick(item)} />
                    ))

                }
            </div>

            {editModalOpen && (
                <EditScheduleFormModal initialData={activeSchedule } onSubmit={()=> {}} onClose={()=> {setEditModalOpen(false)}} />
            )}



        </div>
    )
}
export default ScheduleSection
