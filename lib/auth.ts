import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDB } from "@/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { serverConfig } from "@/config/server";
import { sendDeleteAccountVerification, sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from "@/services/mail.service";
import { createAuthMiddleware } from "better-auth/api";
import { twoFactor } from 'better-auth/plugins';
import { passkey } from '@better-auth/passkey'

const db = getDB();

export const auth = betterAuth({
    trustedOrigins: ['192.168.*.*', '10.*.*.*', '127.0.0.1'],
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ user, url, newEmail }) => {
                await sendVerificationEmail({ ...user, email: newEmail }, url);
            }
        },
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, url }) => {
                await sendDeleteAccountVerification(user, url);
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendResetPasswordEmail(user, url);
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendVerificationEmail(user, url);
        }
    },
    socialProviders: {
        github: { ...serverConfig.socialProviders.github },
        discord: { ...serverConfig.socialProviders.discord },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 1, // one hour in seconds
        }
    },
    plugins: [
        nextCookies(),
        twoFactor(),
        passkey(),
    ],
    // hooks: {
    //     after: createAuthMiddleware(async (ctx) => {
    //         if (ctx.path.startsWith('/sign-up')) {
    //             const user = ctx.context.newSession?.user ?? {
    //                 name: ctx.body.name,
    //                 email: ctx.body.email
    //             };

    //             await sendWelcomeEmail(user);
    //         }
    //     })
    // }
});