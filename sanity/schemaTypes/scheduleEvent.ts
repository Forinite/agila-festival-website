import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'scheduleEvent',
    title: 'Schedule Event',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'desc', title: 'Description', type: 'text' }),
        defineField({ name: 'date', title: 'Date', type: 'string' }),
        defineField({
            name: 'schedule',
            title: 'Sub Events',
            type: 'array',
            of: [
                defineType({
                    type: 'object',
                    fields: [
                        defineField({ name: 'time', title: 'Time', type: 'string' }),
                        defineField({ name: 'event', title: 'Event', type: 'string' }),
                    ],
                }),
            ],
        }),
    ],
})
