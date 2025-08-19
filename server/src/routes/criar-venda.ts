import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import db from "../../lib/prisma-cliente.ts";
import { criarVendaRequisição } from "../../types/criar-venda-requesição.ts";
import { sendEmail } from "../../lib/resend-email.ts";

export const criarVenda: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/criar-venda",
        {
            schema: {
                body: criarVendaRequisição,
            },
        },
        async (request) => {
            const { nome, email, telefone, planoId, pesoTotal, dispositivos } = request.body;
            // Lógica para criar a venda

            // 1. Verificando se o cliente já existe
            const clienteExistente = await db.cliente.findFirst({
                where: {
                    OR: [{ email }, { telefone }],
                },
                include: {
                    Venda: true,
                },
            });

            // Atualizar dados da venda do cliente caso ele já exista
            if (clienteExistente) {
                // Verificar se já existe uma venda para este cliente
                const vendaExistente = await db.venda.findUnique({
                    where: { cliente_id: clienteExistente.id },
                });

                if (vendaExistente) {
                    // Atualizar venda existente
                    await db.venda.update({
                        where: { id: vendaExistente.id }, // Usar o ID da venda
                        data: {
                            plano_id: planoId,
                            gamer: dispositivos.gamer,
                            celulares: dispositivos.celulares,
                            computadores: dispositivos.computadores,
                            smart_tvs: dispositivos.smartTvs,
                            tv_box: dispositivos.tvBox,
                            outros: dispositivos.outros,
                            peso_total: pesoTotal,
                        },
                    });
                } else {
                    // Criar nova venda
                    await db.venda.create({
                        data: {
                            cliente_id: clienteExistente.id,
                            plano_id: planoId,
                            gamer: dispositivos.gamer,
                            celulares: dispositivos.celulares,
                            computadores: dispositivos.computadores,
                            smart_tvs: dispositivos.smartTvs,
                            tv_box: dispositivos.tvBox,
                            outros: dispositivos.outros,
                            peso_total: pesoTotal,
                        },
                    });
                }

                const plano = await db.plano.findUnique({
                    where: { id: planoId },
                    select: {
                        nome: true,
                    },
                });

                if (!plano) return { status: "Plano não encontrado" };

                await sendEmail({
                    nameClient: clienteExistente.nome,
                    telephoneClient: clienteExistente.telefone,
                    devices: [
                        { deviceName: "Celulares", deviceWeight: dispositivos.celulares },
                        { deviceName: "Computadores", deviceWeight: dispositivos.computadores },
                        { deviceName: "Smart TVs", deviceWeight: dispositivos.smartTvs },
                        { deviceName: "TV Box", deviceWeight: dispositivos.tvBox },
                        { deviceName: "Outros", deviceWeight: dispositivos.outros },
                    ],
                    weightTotal: pesoTotal,
                    plan: plano.nome,
                });

                return { status: "Venda atualizada com sucesso" };
            }

            // 3. Criando um novo cliente e uma nova venda caso o cliente não exista
            const novoCliente = await db.cliente.create({
                data: {
                    nome,
                    email,
                    telefone,
                },
            });

            await db.venda.create({
                data: {
                    cliente_id: novoCliente.id,
                    plano_id: planoId,
                    gamer: dispositivos.gamer,
                    celulares: dispositivos.celulares,
                    computadores: dispositivos.computadores,
                    smart_tvs: dispositivos.smartTvs,
                    tv_box: dispositivos.tvBox,
                    outros: dispositivos.outros,
                    peso_total: pesoTotal,
                },
            });

            return { status: "Venda criada com sucesso" };
        }
    );
};
