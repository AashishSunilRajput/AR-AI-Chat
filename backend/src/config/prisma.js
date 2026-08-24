import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "ar_ai_chat_mysql",
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;