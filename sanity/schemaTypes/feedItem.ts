// sanity/schemaTypes/feedItem.ts
import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'feedItem',
    title: 'Feed Item',
    type: 'document',
    fields: [
        defineField({
            name: 'media',
            title: 'Media',
            type: 'file',
            options: {
                accept: 'image/*,video/*',
            },
        }),
        defineField({
            name: 'blobUrl',
            title: 'Blob URL',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['https'] }).optional(),
        }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({ name: 'id', title: 'ID', type: 'string' }),
    ],
});