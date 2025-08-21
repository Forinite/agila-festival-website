// app/types/schedule.ts
export interface ScheduleEvent {
    time: string;
    event: string;
}

export interface Schedule {
    _id: string;
    title: string;
    desc: string;
    date: string;
    schedule: ScheduleEvent[];
}