import React from 'react';
import ScheduleCard from '@/app/components/ui/scheduleCard';
import {sanityClient} from "@/sanity/lib/client";
// import { sant } from '@/sanity/lib/sanityClient';

interface SubEvent {
    time: string;
    event: string;
}

interface ScheduleItem {
    _id: string;
    title: string;
    desc: string;
    date: string;
    schedule: SubEvent[];
}

const ScheduleList = async () => {
    let schedules: ScheduleItem[] = [];

    try {
        schedules = await sanityClient.fetch(
            `*[_type == "scheduleEvent"] | order(date asc){
        _id,
        title,
        desc,
        date,
        schedule
      }`
        );
    } catch (error) {
        console.error("Failed to fetch schedules:", error);
        return (
            <p className="text-center text-red-500 font-semibold">
                Failed to load schedule data.
            </p>
        );
    }

    return (
        <div className="commonPadding gap-8 flex flex-col">
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
    );
};

export default ScheduleList;
