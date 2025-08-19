import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../../lib/prisma-cliente.ts";

export const calcularPlano: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/calcular-plano",
        {
            schema: {
                body: z.object({
                    celulares: z.coerce.number(),
                    computadores: z.coerce.number(),
                    smartTvs: z.coerce.number(),
                    tvBox: z.coerce.number(),
                    outros: z.coerce.number(),
                    gamer: z.boolean(),
                }),
            },
        },
        async (request) => {
            const data = request.body;

            // Cálculo do peso total
            let pesoTotal =
                data.celulares * 0.8 +
                data.computadores * 0.5 +
                data.smartTvs * 0.4 +
                data.tvBox * 0.6 +
                data.outros * 0.1;

            if (data.gamer) pesoTotal = pesoTotal * 2;

            const planoRecomendado = await db.plano.findFirst({
                where: {
                    peso_min: { lte: pesoTotal },
                    OR: [
                        { peso_max: { gte: pesoTotal } },
                        { peso_max: null }, // cobre o caso Diamante, sem limite máximo
                    ],
                },
            });

            return { pesoTotal, planoRecomendado };
        }
    );
};
