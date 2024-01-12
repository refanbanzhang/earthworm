import type { Config } from "drizzle-kit";
import { env } from "@shared/env";

export default {
  schema: "libs/shared/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL || "",
  },
} satisfies Config;
