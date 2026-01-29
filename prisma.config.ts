import "dotenv/config"; 
import { defineConfig } from "@prisma/config"; 

export default defineConfig({
  schema: "prisma/schema.prisma",
  // 这里的 datasource 是给终端命令（CLI）用的
  datasource: {
    url: process.env.DATABASE_URL, 
  },
  // 你之前的 seed 和 migrations 配置可以保留，没有冲突
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts", 
  },
});