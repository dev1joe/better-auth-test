import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { serverConfig } from '@/config/server';
import * as schema from './schema';

export type DB = ReturnType<typeof drizzle<typeof schema>>;
let db: DB | null = null;

export function getDB() {
    if (!db) {
        db = drizzle(serverConfig.db.url, {
            schema: schema,
            casing: 'snake_case',
        });
    }
    return db;
}