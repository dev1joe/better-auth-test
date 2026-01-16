import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDB } from "@/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

const db = getDB();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
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