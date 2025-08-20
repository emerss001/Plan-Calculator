import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {} from "@fastify/multipart";
import z from "zod";
import XLSX from "xlsx";
import { excelRowSchema } from "../../types/excelRowSchema.ts";
import db from "../../lib/prisma-cliente.ts";

export const uploadVendas: FastifyPluginAsyncZod = async (app) => {
    app.post("/upload-vendas", async (request, reply) => {
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
            for (const rawRow of jsonData.entries()) {
                try {
                    // Validar e transformar os dados
                    const validatedRow = excelRowSchema.parse(rawRow);

                    // Calcular peso total
                    let pesoTotal =
                        validatedRow.Celulares * 0.8 +
                        validatedRow.Computadores * 0.5 +
                        validatedRow["Smart TV"] * 0.4 +
                        validatedRow["Tv box"] * 0.6 +
                        validatedRow["Outros dispositivos"] * 0.1;

                    if (validatedRow["Cliente Gamer"]) pesoTotal = pesoTotal * 2;

                    const planoRecomendado = await db.plano.findFirst({
                        where: {
                            peso_min: { lte: pesoTotal },
                            OR: [{ peso_max: { gte: pesoTotal } }, { peso_max: null }],
                        },
                    });

                    if (!planoRecomendado) {
                        throw new Error("Nenhum plano encontrado para o peso calculado");
                    }

                    // Verificar se cliente já existe ou criar um novo
                    let cliente = await db.cliente.findUnique({
                        where: { email: validatedRow["E-mail"] },
                    });

                    if (!cliente && validatedRow["E-mail"]) {
                        cliente = await db.cliente.create({
                            data: {
                                nome: validatedRow.nome,
                                email: validatedRow["E-mail"],
                                telefone: validatedRow.telefone || "",
                            },
                        });
                    }

                    if (!cliente) return reply.status(400).send({ error: "Cliente não encontrado ou criado" });

                    await db.venda.create({
                        data: {
                            cliente_id: cliente.id,
                            plano_id: planoRecomendado.id,
                            gamer: validatedRow["Cliente Gamer"],
                            celulares: validatedRow.Celulares,
                            computadores: validatedRow.Computadores,
                            smart_tvs: validatedRow["Smart TV"],
                            tv_box: validatedRow["Tv box"],
                            outros: validatedRow["Outros dispositivos"],
                            peso_total: pesoTotal,
                        },
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
