// 1. 这一行很重要，它负责把 .env 里的变量读入内存
import "dotenv/config"; 
// 2. 如果 "prisma/config" 报错，尝试改为 "@prisma/config"
import { defineConfig } from "@prisma/config"; 

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // 3. 确保这里的变量名和 .env 里的一模一样
    url: process.env.DATABASE_URL, 
  },
});
