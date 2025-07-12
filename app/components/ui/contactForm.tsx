'use client'

import {FormEvent, useRef, useState} from 'react';
import FormSelect from "@/app/components/ui/formSelect";
import emailjs from '@emailjs/browser'

const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'volunteer', label: 'Volunteer Opportunity' },
    { value: 'partnership', label: 'Partnership/Sponsorship' },
    { value: 'media', label: 'Media/Press Request' },
    { value: 'pageant', label: 'Face of Idoma Pageant' },
    { value: 'other', label: 'Other' }
];

const ContactForm = () => {
    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     // Add form submission logic here
    // };

    //const [name, setName] = useState("")


    const form = useRef<HTMLFormElement>(null)

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.current) return;

        emailjs
            .sendForm('contact_service', 'contact_form', form.current, 'Zx7N6xMTVXaVFWLXP' )
            .then(
                () => {
                    console.log('SUCCESS!')
                    alert('Message sent!')
                    form.current?.reset()
                },
                (error) => {
                    console.log('FAILED...', error)
                    alert('Message failed to send')
                }
            )
    }

    return (
        <section className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form id={'contact-form'} ref={form}  onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium leading-none" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            id="firstName"
                            placeholder="Your first name"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            name="last_name"
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            id="lastName"
                            placeholder="Your last name"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium leading-none" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="email"
                        placeholder="your.email@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium leading-none" htmlFor="subject">
                        Subject
                    </label>
                    <FormSelect />
                </div>
                <div>
                    <label className="text-sm font-medium leading-none" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        name="message"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        id="message"
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-full bg-red-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-600 cursor-pointer"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default ContactForm;