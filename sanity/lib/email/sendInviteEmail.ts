// /lib/email/sendSetupLink.ts
import nodemailer from 'nodemailer';

export async function sendInviteEmail({ email, name, password }: { email: string, name: string, password: string }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Ech'ija Carnival" <${process.env.EMAIL_SENDER}> on behalf of echijaculturalfestival2812ot@gmail.com`,
        to: email,
        subject: "Your Ech'ija Carnival Admin Account",
        html: `
      <h2>Hi ${name},</h2>
      <p>You’ve been added as an admin to the Ech'ija Carnival dashboard.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>You can now log in at <a href="www.echijaculturalfestival.com">www.echijaculturalfestival.com</a>.</p>
      <br>
      <p>Best,<br>Ech'ija Carnival Team</p>
      <p>echijaculturalfestival2812ot@gmail.com</p>
    `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[EMAIL] Sent successfully:', info.messageId);
}
