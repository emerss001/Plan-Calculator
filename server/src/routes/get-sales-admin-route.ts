import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import db from "../../lib/prisma-cliente.ts";

export const getSalesAdminRoute: FastifyPluginAsyncZod = async (app) => {
    app.get("/admin/vendas", { onRequest: [(app as any).authenticate] }, async (request, reply) => {
        const sales = await db.sale.findMany({
            include: {
                plan: true,
                client: true,
            },
        });

        return { sales };
    });
};
