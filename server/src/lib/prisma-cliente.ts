import { PrismaClient } from "@prisma/client";
// Cria uma instância do PrismaClient para interagir com o banco de dados
const db = new PrismaClient();

export default db;
