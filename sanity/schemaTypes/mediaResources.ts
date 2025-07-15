import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'mediaResource',
    title: 'Media Resource',
    type: 'document',
    fields: [
        defineField({ name: 'text', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'URL', type: 'url' }),
    ],
})
