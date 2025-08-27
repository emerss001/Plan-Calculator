import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import jwt from "@fastify/jwt";
import { env } from "../env.ts";
import { ClientError } from "../erros/client-error.ts";

export const jwtPlugin = async (app: FastifyInstance) => {
    app.register(jwt, { secret: env.JWT_SECRET });

    app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            throw new ClientError("Token inválido ou ausente", 401);
        }
    });
};
