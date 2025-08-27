import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import db from "../../../lib/prisma-cliente.ts";

export const getMetricsAdmin: FastifyPluginAsyncZod = async (app) => {
    app.get("/admin/metrics", { onRequest: [(app as any).authenticate] }, async (request, reply) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const [totalSales, todaySales, confirmedSales, devicesAggregate] = await db.$transaction([
            db.sale.count(),
            db.sale.count({
                where: {
                    createdAt: {
                        gte: today,
                        lt: tomorrow,
                    },
                },
            }),
            db.sale.count({
                where: {
                    confirmed: true,
                },
            }),
            db.sale.aggregate({
                _sum: {
                    totalDevices: true,
                },
            }),
        ]);

        return {
            totalSales,
            todaySales,
            confirmedSales,
            totalDevices: devicesAggregate._sum.totalDevices || 0,
        };
    });
};
