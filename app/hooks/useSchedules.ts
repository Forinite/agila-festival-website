// app/hooks/useSchedules.ts
'use client';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/client';
import { Schedule } from '@/app/types/schedule';

export const useSchedules = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            const data = await sanityClient.fetch<Schedule[]>(
                `*[_type == "schedule"] | order(date asc) {
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
};