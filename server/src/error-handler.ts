import { FastifyInstance } from "fastify";
import { ClientError } from "./erros/client-error.ts";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if (error.validation) {
        return reply.status(400).send({
            message: error.message,
        });
    }

    if (error instanceof ClientError) {
        return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Internal server error" });
};
