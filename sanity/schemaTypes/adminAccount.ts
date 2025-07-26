// sanity/schemas/adminAccount.ts
import { defineType, defineField } from 'sanity';

export const adminAccount = defineType({
    name: 'adminAccount',
    title: 'Admin Account',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.required().email(),
        }),
        defineField({
            name: 'hashedPassword',
            title: 'Hashed Password',
            type: 'string',
            validation: Rule => Rule.required(),
            hidden: true,
        }),
    ],
});
