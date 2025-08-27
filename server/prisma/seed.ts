import { PrismaClient } from "@prisma/client";
import { calculeOfPlan } from "../src/utils/calculate-weight-of-plan.ts";
import db from "../src/lib/prisma-cliente.ts";
import { createHashPassword } from "../src/utils/create-hash-password.ts";

const prisma = new PrismaClient();

type SaleDevices = {
    computers: number;
    phones: number;
    smartTvs: number;
    tvBox: number;
    others: number;
    gamer: boolean;
};

async function main() {
    // Limpa todas as tabelas antes de inserir os dados
    console.log("limpando tudo o que tem no banco de dados");
    await Promise.all([
        prisma.sale.deleteMany({}),
        prisma.client.deleteMany({}),
        prisma.plan.deleteMany({}),
        prisma.admin.deleteMany({}),
    ]);
    // cria os planos iniciais
    await prisma.plan.createMany({
        data: [
            {
                name: "Prata",
                price: 50.0,
                speed_mbps: 100,
                weightMin: 0.0,
                weightMax: 0.99,
                description: "Ideal para navegação e streaming em HD.",
            },
            {
                name: "Bronze",
                price: 80.0,
                speed_mbps: 300,
                weightMin: 1.0,
                weightMax: 2.0,
                description: "Perfeito para gamers e streaming em 4K.",
            },

            {
                name: "Ouro",
                price: 100.0,
                speed_mbps: 500,
                weightMin: 2.01,
                weightMax: 2.99,
                description: "Excelente para famílias com múltiplos dispositivos.",
            },
            {
                name: "Diamante",
                price: 130.0,
                speed_mbps: 800,
                weightMin: 3.0,
                weightMax: null,
                description: "Excelente para famílias com múltiplos dispositivos.",
            },
        ],
    });

    await prisma.client.createMany({
        data: [
            {
                name: "João Pereira Silva",
                email: "joaopepe@gmail.com",
                telephone: "77981818181",
                lastSaleDate: new Date(),
            },
            {
                name: "Mariana Souza Neves",
                email: "Mari.neves@outlook.com",
                telephone: "77998523014",
                lastSaleDate: new Date(),
            },
        ],
    });

    const clients = await prisma.client.findMany({
        where: {
            email: { in: ["joaopepe@gmail.com", "Mari.neves@outlook.com"] },
        },
    });

    const sales: SaleDevices[] = [
        {
            computers: 2,
            phones: 4,
            smartTvs: 2,
            tvBox: 0,
            others: 3,
            gamer: true,
        },
        {
            computers: 1,
            phones: 2,
            smartTvs: 1,
            tvBox: 1,
            others: 2,
            gamer: false,
        },
        {
            computers: 1,
            phones: 2,
            smartTvs: 1,
            tvBox: 0,
            others: 3,
            gamer: true,
        },
        {
            computers: 2,
            phones: 2,
            smartTvs: 2,
            tvBox: 1,
            others: 3,
            gamer: false,
        },
    ];

    for (const sale of sales) {
        const clientsIndex = sales.indexOf(sale);
        const weightTotalCalculated = calculeOfPlan(sale);
        const totalDevices = sale.computers + sale.phones + sale.smartTvs + sale.tvBox + sale.others;

        const planRecommendedId = await db.plan.findFirst({
            where: {
                weightMin: { lte: weightTotalCalculated },
                OR: [{ weightMax: { gte: weightTotalCalculated } }, { weightMax: null }],
            },
        });

        await prisma.sale.createMany({
            data: [
                {
                    clientId: clients[clientsIndex > 1 ? 1 : 0].id,
                    planId: planRecommendedId?.id!,
                    totalDevices,
                },
            ],
        });
    }

    await prisma.admin.create({
        data: {
            username: "admin",
            password: await createHashPassword("desafio"),
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .then(() => {
        console.log("Seed realizada com sucesso ✅");
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
