import { serverConfig } from "@/config/server";
import { MailtrapClient } from "mailtrap"

type EmailOptions = {
    from: { name: string, email: string },
    to: string,
    subject: string,
    text?: string,
    html?: string
}

type User = {
    name: string,
    email: string,
}

// TODO: update email templates from webdevsimplified github
export function sendVerificationEmail(user: User, url: string) {
    const options: EmailOptions = {
        from: { name: "better auth test app", email: serverConfig.appEmail },
        to: user.email,
        subject: "Test verification email",
        html: `
            <h1>Verification Email</h1>
            <p><a href="${url}">verify your email</a></p>
        `
    }

    return sendTestEmail(options);
}

export function sendResetPasswordEmail(user: User, url: string){
        const options: EmailOptions = {
        from: { name: "better auth test app", email: serverConfig.appEmail },
        to: user.email,
        subject: "Test password reset email",
        html: `
            <h1>Password reset Email</h1>
            <p><a href="${url}">Reset your password</a></p>
        `
    };

    return sendTestEmail(options);
}

export function sendWelcomeEmail(user: User) {
    const options: EmailOptions = {
        from: { name: "better auth test app", email: serverConfig.appEmail },
        to: user.email,
        subject: `Welcome ${user.name} to test application`,
        html: `
            <h1>Welcome to test application</h1>
        `
    }

    return sendTestEmail(options);
}

function sendEmail(options: EmailOptions) {
    const client = new MailtrapClient({ token: serverConfig.mailtrap.token });

    return client.send({
        from: options.from,
        to: [{ email: options.to }],
        subject: options.subject,
        text: options.text,
        html: options.html
    });
}

function sendTestEmail(options: EmailOptions) {
    const client = new MailtrapClient({
        token: serverConfig.mailtrap.token,
        sandbox: true,
        testInboxId: 4329610
    });

    return client.send({
        from: options.from,
        to: [{ email: options.to }],
        subject: options.subject,
        text: options.text,
        html: options.html
    });
}