'use client'
import React from 'react'
import {useSchedules} from "@/app/hooks/useSchedules";
import ScheduleCard from "@/app/components/ui/scheduleCard";

const ScheduleList = () => {
    const { schedules, loading } = useSchedules();
    if (loading) return <p className="flex items-center justify-center">Fetching Schedules...</p>
    return (
        <div className={'commonPadding gap-8 flex flex-col '}>
            {schedules.map((item, index) => (
                <ScheduleCard
                    key={item.title + `${index}`}
                    title={item.title}
                    date={item.date}
                    description={item.desc}
                    schedule={item.schedule}
                />
            ))}

        </div>
    )
}
export default ScheduleList
