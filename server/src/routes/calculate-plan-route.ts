import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import db from "../lib/prisma-cliente.ts";
import { CalculePlanRequest } from "../types/calculate-plan-request.ts";
import { calculeOfPlan } from "../utils/calculate-weight-of-plan.ts";

export const calculePlanRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/calcular-plano",
        {
            schema: {
                body: CalculePlanRequest,
            },
        },
        async (request) => {
            const { computers, gamer, others, phones, smartTvs, tvBox } = request.body;

            // Cálculo do peso total
            const weightTotal = calculeOfPlan({
                phones,
                computers,
                gamer,
                others,
                smartTvs,
                tvBox,
            });

            const planRecommended = await db.plan.findFirst({
                where: {
                    weightMin: { lte: weightTotal },
                    OR: [
                        { weightMax: { gte: weightTotal } },
                        { weightMax: null }, // cobre o caso Diamante, sem limite máximo
                    ],
                },
            });

            return { weightTotal, planRecommended };
        }
    );
};
