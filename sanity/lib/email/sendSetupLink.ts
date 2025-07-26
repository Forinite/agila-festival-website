import emailjs from '@emailjs/nodejs';

export async function sendSetupLink(email: string, name: string, password: string) {
    console.log('[EMAIL] Sending email via EmailJS');
    console.log('[EMAIL] Email payload:', { email, name, password: '***' });

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    console.log('[EMAIL] ENV:', { serviceId, templateId, publicKey, hasPrivateKey: !!privateKey });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
        throw new Error('Missing one or more EMAILJS env variables');
    }

    try {
        await emailjs.send(
            serviceId,
            templateId,
            {
                to_email: email,
                to_name: name,
                password,
            },
            {
                publicKey,
                privateKey, // Required for Node.js
            }
        );
        console.log('[EMAIL] EmailJS send completed');
    } catch (err) {
        console.error('[EMAIL] EmailJS send error:', err);
        throw new Error('Failed to send email');
    }
}
