import { FastifyInstance } from "fastify";
import { ClientError } from "./erros/client-error.ts";
import { PrismaClientInitializationError } from "@prisma/client/runtime/binary";
import { Prisma } from "@prisma/client";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    console.log(error);

    if (error.validation) {
        console.log(error);
        return reply.status(400).send({
            message: error.message,
        });
    }

    if (error instanceof ClientError) {
        return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Internal server error" });
};
