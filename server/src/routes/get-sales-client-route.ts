import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../../lib/prisma-cliente.ts";

export const getSalesClientRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/admin/get-sales-clients",

        {
            onRequest: [(app as any).authenticate],
            schema: {
                body: z.object({
                    name: z.string().optional(),
                    email: z.string().optional(),
                    telephone: z.string().optional(),
                }),
            },
        },
        async (request, reply) => {
            const { name, email, telephone } = request.body;

            const sales = db.sale.findMany({
                where: {
                    OR: [
                        {
                            client: {
                                name: { contains: name, mode: "insensitive" },
                            },
                        },
                        {
                            client: {
                                email: { contains: email, mode: "insensitive" },
                            },
                        },
                        {
                            client: {
                                telephone: { contains: telephone, mode: "insensitive" },
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    createdAt: true,
                    confirmed: true,
                    client: {
                        select: {
                            name: true,
                            email: true,
                            telephone: true,
                        },
                    },
                    plan: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            return sales;
        }
    );
};
