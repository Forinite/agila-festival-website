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
        from: `"Agila Carnival" <${process.env.EMAIL_SENDER}>`,
        to: email,
        subject: 'Your Agila Carnival Admin Account',
        html: `
      <h2>Hi ${name},</h2>
      <p>You’ve been added as an admin to the Agila Carnival dashboard.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>You can now log in at <a href=" http://192.168.31.121:3000/signin">https://your-site.com/signin</a>.</p>
      <br>
      <p>Best,<br>Agila Carnival Team</p>
    `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[EMAIL] Sent successfully:', info.messageId);
}
