'use client'

import { Suspense, useRef, useState} from 'react';
import FormSelect from "@/app/components/ui/formSelect";
import {toast} from "@/lib/toast";


const ContactForm = () => {


    const form = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);

        const formData = new FormData(form.current!)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (result.success) {
                toast.success('Message sent!')
                form.current?.reset()
            } else {
                toast.error('Message failed to send')
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
        setLoading(false);
    }
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
                    <Suspense fallback={<div>Loading form...</div>}>
                        <FormSelect />
                    </Suspense>
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
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z" />
                            </svg>
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </section>
    );
};

export default ContactForm;