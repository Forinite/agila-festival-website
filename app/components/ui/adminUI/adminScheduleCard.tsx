'use client';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface ScheduleItem {
    time: string;
    event: string;
}

interface ScheduleCardProps {
    date: string;
    title: string;
    description: string;
    schedule: ScheduleItem[];
    onEdit: () => void;
    onDelete: () => void;
}

const AdminScheduleCard: React.FC<ScheduleCardProps> = ({
                                                            date,
                                                            title,
                                                            description,
                                                            schedule,
                                                            onEdit,
                                                            onDelete,
                                                        }) => {
    return (
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
            {/* Header */}
            <div className="flex flex-col  gap-2 mb-4 mt-4">
        <span className="inline-block bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-full text-center min-w-[90px]">
          {date}
        </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base mb-4">{description}</p>

            {/* Events */}
            <div className="space-y-2">
                {schedule.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                        <span className="mr-2 text-blue-600 font-semibold">{item.time}</span>
                        <span className="truncate">{item.event}</span>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                    onClick={onEdit}
                    className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                    aria-label="Edit schedule"
                >
                    <Pencil size={18} />
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                    aria-label="Delete schedule"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default AdminScheduleCard;
