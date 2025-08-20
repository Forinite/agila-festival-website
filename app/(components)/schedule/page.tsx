import React from 'react'
import ScheduleList from "@/app/(components)/schedule/scheduleList";
const SchedulePage = () => {

    return (
        <section id="schedule" className={'bg-neutral-200 py-16'}>
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                    Event <span className="text-red-500">Schedule</span>
                </h2>
                <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
                    Two days of cultural celebration, traditional performances, and community festivities. December
                    27-28, 2025
                </p>
            </div>
            <ScheduleList />


        </section>
    )
}
export default SchedulePage
