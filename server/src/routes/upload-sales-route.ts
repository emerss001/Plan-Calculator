import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {} from "@fastify/multipart";
import z from "zod";
import XLSX from "xlsx";
import { excelRowSchema } from "../../types/excel-row-schema.ts";
import db from "../../lib/prisma-cliente.ts";
import { calculeOfPlan } from "../../utils/calculate-weight-of-plan.ts";

export const uploadSalesRoute: FastifyPluginAsyncZod = async (app) => {
    app.post("/admin/upload-vendas", { onRequest: [(app as any).authenticate] }, async (request, reply) => {
        try {
            const file = await request.file();

            if (!file) {
                return reply.status(400).send({ error: "Nenhum arquivo enviado" });
            }

            if (file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                return reply.status(400).send({ error: "Apenas arquivos XLSX são permitidos" });
            }

            const buffer = await file.toBuffer();
            const workbook = XLSX.read(buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            let processedRows = 0;
            const errors: string[] = [];
            for (const rawRow of jsonData) {
                try {
                    // Validar e transformar os dados
                    const validatedRow = excelRowSchema.parse(rawRow);

                    // Calcular peso total
                    const weightTotalCalculated = calculeOfPlan({
                        computers: validatedRow.Computadores,
                        phones: validatedRow.Celulares,
                        smartTvs: validatedRow["Smart TV"],
                        tvBox: validatedRow["Tv box"],
                        others: validatedRow["Outros dispositivos"],
                        gamer: validatedRow["Cliente Gamer"],
                    });

                    const planRecommended = await db.plan.findFirst({
                        where: {
                            weightMin: { lte: weightTotalCalculated },
                            OR: [{ weightMax: { gte: weightTotalCalculated } }, { weightMax: null }],
                        },
                    });

                    if (!planRecommended) {
                        throw new Error("Nenhum plano encontrado para o peso calculado");
                    }

                    // Verificar se cliente já existe ou criar um novo
                    let cliente = await db.client.findUnique({
                        where: { email: validatedRow["E-mail"] },
                    });

                    if (!cliente && validatedRow["E-mail"]) {
                        cliente = await db.client.create({
                            data: {
                                name: validatedRow.nome,
                                email: validatedRow["E-mail"],
                                telephone: validatedRow.telefone || "",
                                lastSaleDate: new Date(),
                            },
                        });
                    }

                    if (!cliente) return reply.status(400).send({ error: "Cliente não encontrado ou criado" });

                    const totalDevices =
                        validatedRow.Computadores +
                        validatedRow.Celulares +
                        validatedRow["Smart TV"] +
                        validatedRow["Tv box"] +
                        validatedRow["Outros dispositivos"];

                    await db.sale.create({
                        data: {
                            clientId: cliente.id,
                            planId: planRecommended.id,
                            gamer: validatedRow["Cliente Gamer"],
                            totalDevices: totalDevices,
                        },
                    });

                    await db.client.update({
                        where: { id: cliente.id },
                        data: { lastSaleDate: new Date() },
                    });

                    processedRows++;
                } catch (error) {
                    app.log.error(error);
                }
            }

            return reply.send({
                success: true,
                message:
                    processedRows === jsonData.length
                        ? "Todas as vendas processadas com sucesso"
                        : `${processedRows} de ${jsonData.length} vendas processadas`,
                totalRows: jsonData.length,
                processedRows,
                errors: errors.length > 0 ? errors : undefined,
            });
        } catch (error) {
            console.error(error);
            return { status: "Erro ao fazer upload do arquivo" };
        }
    });
};
