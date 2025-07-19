import { defineType } from 'sanity';

export default  defineType({
    name: 'contactInfo',
    title: 'Contact Info',
    type: 'document',
    fields: [
        {
            name: 'location',
            title: 'Location',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Physical location lines',
        },
        {
            name: 'emails',
            title: 'Emails',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'phones',
            title: 'Phones',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'instagram',
            title: 'Instagram',
            type: 'string',
        },
        {
            name: 'twitter',
            title: 'Twitter',
            type: 'string',
        },
        {
            name: 'facebook',
            title: 'Facebook',
            type: 'string',
        },
        {
            name: 'youtube',
            title: 'YouTube',
            type: 'string',
        },
    ],
});
