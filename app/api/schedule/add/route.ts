//app/api/schedule/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {sanityWriteClient} from "@/sanity/lib/sanityClient";

export async function POST(req: NextRequest) {
    try {
        const { title, desc, date, schedule } = await req.json();

        const newDoc = await sanityWriteClient.create({
            _type: 'scheduleEvent',
            title,
            desc,
            date,
            schedule,
        });

        return NextResponse.json(newDoc, { status: 201 });
    } catch (error) {
        console.error('Error creating schedule:', error);
        return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
    }
}
