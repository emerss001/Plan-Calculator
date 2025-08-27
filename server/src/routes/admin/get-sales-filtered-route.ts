import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../../../lib/prisma-cliente.ts";

export const getSalesFilteredRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/admin/get-sales-filtered",

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

            const filters: any[] = [];

            if (name) {
                filters.push({
                    client: { name: { contains: name, mode: "insensitive" } },
                });
            }

            if (email) {
                filters.push({
                    client: { email: { contains: email, mode: "insensitive" } },
                });
            }

            if (telephone) {
                filters.push({
                    client: { telephone: { contains: telephone, mode: "insensitive" } },
                });
            }

            const sales = await db.sale.findMany({
                where: filters.length > 0 ? { OR: filters } : { id: "" },
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
