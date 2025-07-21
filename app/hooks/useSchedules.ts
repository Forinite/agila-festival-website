'use client';

import { useEffect, useState } from 'react';
import {sanityClient} from "@/sanity/lib/client";

export interface SubEvent {
    time: string;
    event: string;
}

export interface ScheduleItem {
    _id: string;
    title: string;
    desc: string;
    date: string;
    schedule: SubEvent[];
}

export function useSchedules() {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            const data = await sanityClient.fetch<ScheduleItem[]>(
                `*[_type == "scheduleEvent"] | order(date asc){
          _id, title, desc, date, schedule
        }`
            );
            setSchedules(data);
        } catch (err) {
            console.error('Failed to fetch schedules:', err);
            setError('Failed to load schedule data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return { schedules, loading, error, refetch: fetchSchedules };
}
