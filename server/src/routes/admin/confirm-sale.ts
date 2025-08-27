import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../../lib/prisma-cliente.ts";
import { ClientError } from "../../erros/client-error.ts";

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

            const sale = await db.sale.findUnique({
                where: { id: saleId },
            });

            if (!sale) {
                throw new ClientError("Sale not found", 404);
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
