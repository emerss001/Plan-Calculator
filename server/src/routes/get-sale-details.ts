import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../lib/prisma-cliente.ts";

export const getSaleDetails: FastifyPluginAsyncZod = async (app) => {
    app.get(
        "/sale/:saleId",
        {
            schema: {
                params: z.object({
                    saleId: z.string(),
                }),
            },
        },
        async (request) => {
            const { saleId } = request.params;

            const sale = await db.sale.findUnique({
                where: { id: saleId },
                select: {
                    id: true,
                    totalDevices: true,
                    createdAt: true,
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
                            price: true,
                            speed_mbps: true,
                        },
                    },
                },
            });

            return { sale };
        }
    );
};
