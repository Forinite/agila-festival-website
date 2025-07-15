import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'socialLink',
    title: 'Social Link',
    type: 'document',
    fields: [
        defineField({ name: 'platform', title: 'Platform', type: 'string' }),
        defineField({ name: 'href', title: 'Link', type: 'url' }),
        defineField({ name: 'bgColor', title: 'Background Color Class', type: 'string' }),
    ],
})

