import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'feedItem',
    title: 'Feed Item',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
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
})
