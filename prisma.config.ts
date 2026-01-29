import "dotenv/config"; 
import { defineConfig } from "@prisma/config"; 

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // ⬇️ 就是加下面这一行，告诉 Prisma 种子脚本的位置
    seed: "tsx prisma/seed.ts", 
  },
  datasource: {
    url: process.env.DATABASE_URL, 
  },
});