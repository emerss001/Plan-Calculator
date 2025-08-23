import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import db from "../../lib/prisma-cliente.ts";
import { sendEmailClient } from "../../lib/resend-email.ts";
import { createSaleRequest } from "../../types/create-sale-request.ts";

export const createSaleRoute: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/criar-venda",
        {
            schema: {
                body: createSaleRequest,
            },
        },
        async (request) => {
            const { devices, email, name, planId, telephone, weightTotal } = request.body;

            // 1. Verificando se o cliente já existe
            const clientExists = await db.client.findFirst({
                where: {
                    OR: [{ email }, { telephone }],
                },
            });

            const planOfClient = await db.plan.findUnique({
                where: { id: planId },
                select: {
                    name: true,
                },
            });

            if (!planOfClient) {
                throw new Error("Plano não encontrado");
            }

            const totalDevices = devices.computers + devices.phones + devices.smartTvs + devices.tvBox + devices.others;

            // criar nova venda do cliente caso ele já exista
            if (clientExists) {
                await db.sale.create({
                    data: {
                        clientId: clientExists.id,
                        planId: planId,
                        gamer: devices.gamer,
                        totalDevices: totalDevices,
                    },
                });

                await sendEmailClient({
                    nameClient: clientExists.name,
                    telephoneClient: clientExists.telephone,
                    devices: [
                        { deviceName: "Celulares", deviceWeight: devices.phones },
                        { deviceName: "Computadores", deviceWeight: devices.computers },
                        { deviceName: "Smart TVs", deviceWeight: devices.smartTvs },
                        { deviceName: "TV Box", deviceWeight: devices.tvBox },
                        { deviceName: "Outros", deviceWeight: devices.others },
                    ],
                    weightTotal: weightTotal,
                    plan: planOfClient.name,
                });

                return { status: "Venda criada com sucesso" };
            }

            // 3. Criando um novo cliente e uma nova venda caso o cliente não exista
            const newClient = await db.client.create({
                data: {
                    name,
                    email,
                    telephone,
                },
            });

            await db.sale.create({
                data: {
                    clientId: newClient.id,
                    planId: planId,
                    gamer: devices.gamer,
                    totalDevices,
                },
            });

            await sendEmailClient({
                nameClient: newClient.name,
                telephoneClient: newClient.telephone,
                devices: [
                    { deviceName: "Celulares", deviceWeight: devices.phones },
                    { deviceName: "Computadores", deviceWeight: devices.computers },
                    { deviceName: "Smart TVs", deviceWeight: devices.smartTvs },
                    { deviceName: "TV Box", deviceWeight: devices.tvBox },
                    { deviceName: "Outros", deviceWeight: devices.others },
                ],
                weightTotal: weightTotal,
                plan: planOfClient.name,
            });

            return { status: "Venda criada com sucesso" };
        }
    );
};
