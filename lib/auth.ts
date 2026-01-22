import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDB } from "@/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { serverConfig } from "@/config/server";
import { sendResetPasswordEmail, sendVerificationEmail } from "@/services/mail.service";

const db = getDB();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({user, url}) => {
            await sendResetPasswordEmail(user, url);
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({user, url}) => {
            await sendVerificationEmail(user, url);
        }
    },
    socialProviders: {
        github: { ...serverConfig.socialProviders.github},
        discord: { ...serverConfig.socialProviders.discord},
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24, // one day in seconds
        }
    },
    plugins: [
        nextCookies()
    ]
});