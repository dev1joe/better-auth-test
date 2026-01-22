import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.url().min(1),
    ARCJET_KEY: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    MAILTRAP_TOKEN: z.string().min(1),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
    console.error('❌ Invalid environment variables:', parseResult.error.format());
    throw new Error('Invalid environment variables');
}

export const serverConfig = {
    db: {
        url: parseResult.data.DATABASE_URL,
    },
    arcjet: {
        key: parseResult.data.ARCJET_KEY,
    },
    socialProviders: {
        discord: {
            clientId: parseResult.data.DISCORD_CLIENT_ID,
            clientSecret: parseResult.data.DISCORD_CLIENT_SECRET
        },
        github: {
            clientId: parseResult.data.GITHUB_CLIENT_ID,
            clientSecret: parseResult.data.GITHUB_CLIENT_SECRET
        }
    },
    mailtrap: {
        token: parseResult.data.MAILTRAP_TOKEN
    }
}