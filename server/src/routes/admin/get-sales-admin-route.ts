import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import db from "../../../lib/prisma-cliente.ts";

export const getSalesAdminRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/admin/vendas", { onRequest: [(app as any).authenticate] }, async (request, reply) => {
        const clientsWithSales = await db.client.findMany({
            orderBy: {
                lastSaleDate: "desc",
            },
            where: {
                Sale: {
                    every: {
                        confirmed: false,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                telephone: true,
                Sale: {
                    orderBy: {
                        createdAt: "desc",
                    },
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

        console.log(clientsWithSales.map((client) => client.Sale).flat());

        return clientsWithSales;
    });
};
