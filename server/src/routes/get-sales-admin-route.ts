import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import db from "../../lib/prisma-cliente.ts";

export const getSalesAdminRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/admin/vendas", { onRequest: [(app as any).authenticate] }, async (request, reply) => {
        const clientsWithSales = await db.client.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                telephone: true,
                Sale: {
                    select: {
                        id: true,
                        createdAt: true,
                        gamer: true,
                        totalDevices: true,
                        plan: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return clientsWithSales;
    });
};
