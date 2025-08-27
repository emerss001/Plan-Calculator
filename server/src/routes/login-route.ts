import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../lib/prisma-cliente.ts";
import bcrypt from "bcrypt";
import { ClientError } from "../erros/client-error.ts";

export const loginRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/login",
        {
            schema: {
                body: z.object({
                    username: z.string(),
                    password: z.string().min(6),
                }),
            },
        },
        async (request, reply) => {
            const { username, password } = request.body;

            // 1. Buscar usuário no banco
            const user = await db.admin.findUnique({
                where: {
                    username,
                },
            });
            if (!user) {
                throw new ClientError("Credenciais inválidas", 401);
            }

            // 2. Validar senha
            if (!(await bcrypt.compare(password, user.password))) {
                throw new ClientError("Credenciais inválidas", 401);
            }

            // 3. Gerar token JWT
            const token = app.jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                { expiresIn: "1h" }
            );

            return reply.send({ token });
        }
    );
};
