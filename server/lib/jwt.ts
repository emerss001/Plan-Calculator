import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import jwt from "@fastify/jwt";
import { env } from "../src/env.ts";

export const jwtPlugin = async (app: FastifyInstance) => {
    app.register(jwt, { secret: env.JWT_SECRET });

    app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ error: "Token inválido ou ausente" });
        }
    });
};
