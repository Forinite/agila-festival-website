import React from 'react'
import ScheduleCard from "@/app/components/ui/scheduleCard";
import {scheduleData, scheduleDocument} from "@/app/constants/scheduleData";

const SchedulePage = () => {
    return (
        <section id="schedule" className={'bg-neutral-200 py-16'}>
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                    Event <span className="text-red-500">Schedule</span>
                </h2>
                <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
                    Four days of cultural celebration, traditional performances, and community festivities. December
                    23-26, 2025
                </p>
            </div>
            <div className={'commonPadding gap-8 flex flex-col '}>
                {scheduleData.map((item, index) => (
                    <ScheduleCard
                        key={item.title + `${index}`}
                        title={item.title}
                        date={item.date}
                        description={item.desc}
                        schedule={item.schedule}
                    />
                ))}

            </div>
            <div className="text-center mt-12">
                <a href={scheduleDocument} download
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 cursor-pointer">
                    Download Full Schedule PDF
                </a>
            </div>

        </section>
    )
}
export default SchedulePage
