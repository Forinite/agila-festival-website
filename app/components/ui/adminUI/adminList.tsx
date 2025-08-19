'use client';
import React from 'react';
import { Trash2 } from 'lucide-react';

const AdminList = ({ admins, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {admins.map((admin, index) => (
                <div
                    key={admin.email + `${index}`}
                    className=" relative bg-white border border-gray-300 rounded-xl p-5 flex items-start justify-between shadow-md hover:shadow-lg transition-all"
                >
                    {/* Info */}
                    <div className="flex-1 pr-4 overflow-hidden">
                        <h3 className="text-base font-semibold text-gray-900">{admin.name}</h3>
                        <p className="text-sm text-gray-600 w-full  ">{admin.email}</p>
                    </div>

                    {/* Delete Button */}
                    { admin.email != 'echijaculturalfestival2812ot@gmail.com' && <button
                        onClick={() => onDelete(admin)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 transition absolute top-2 right-4"
                        aria-label={`Remove ${admin.name}`}
                    >
                        <Trash2 size={18} />
                    </button>
                    }
                </div>
            ))}
        </div>
    );
};

export default AdminList;
