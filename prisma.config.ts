import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // For migrations, use the direct (non-pooled) connection if available,
    // otherwise fall back to the pooled URL.
    url:
      process.env["POSTGRES_URL_NON_POOLING"] ||
      process.env["POSTGRES_PRISMA_URL"]!,
  },
});
