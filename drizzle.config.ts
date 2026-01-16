import { defineConfig } from "drizzle-kit";
import { serverConfig } from "./config/server";

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./db/migrations",
    dbCredentials: {
        url: serverConfig.db.url,
    }
})