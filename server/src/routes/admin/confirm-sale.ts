import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../../../lib/prisma-cliente.ts";

export const confirmSaleRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/admin/confirm-sale/:saleId",
        {
            onRequest: [(app as any).authenticate],
            schema: {
                params: z.object({
                    saleId: z.uuid(),
                }),
            },
        },
        async (request, reply) => {
            const { saleId } = request.params;
            console.log(saleId);

            const sale = await db.sale.findUnique({
                where: { id: saleId },
            });

            if (!sale) {
                return reply.status(404).send({ message: "Sale not found" });
            }

            await db.sale.update({
                where: { id: saleId },
                data: { confirmed: true },
            });

            await db.sale.deleteMany({
                where: {
                    AND: [{ clientId: sale.clientId }, { confirmed: false }],
                },
            });

            return reply.status(200).send({ message: "Sale confirmed successfully" });
        }
    );
};
