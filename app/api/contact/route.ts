import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const { name, last_name, email, message, title } = await req.json()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: `"${name} ${last_name}" <${email}>`,
            to: process.env.EMAIL_TO, // e.g., your receiving email
            subject: `New Contact Form: ${title}`,
            text: message,
            html: `
        <p><strong>Name:</strong> ${name} ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${title}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({ success: false, error: 'Email failed to send' }, { status: 500 })
    }
}
