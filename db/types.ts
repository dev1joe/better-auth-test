import { InferSelectModel } from "drizzle-orm";
import { user, account } from "./schema";

export type User = InferSelectModel<typeof user>;
export type Account = InferSelectModel<typeof account>;