import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // cria os planos iniciais
    await prisma.plano.createMany({
        data: [
            {
                nome: "Prata",
                preco: 50.0,
                velocidade_mbps: 100,
                peso_min: 0.0,
                peso_max: 0.99,
                description: "Ideal para navegação e streaming em HD.",
            },
            {
                nome: "Bronze",
                preco: 80.0,
                velocidade_mbps: 300,
                peso_min: 1.0,
                peso_max: 2.0,
                description: "Perfeito para gamers e streaming em 4K.",
            },

            {
                nome: "Ouro",
                preco: 100.0,
                velocidade_mbps: 500,
                peso_min: 2.01,
                peso_max: 2.99,
                description: "Excelente para famílias com múltiplos dispositivos.",
            },
            {
                nome: "Diamante",
                preco: 130.0,
                velocidade_mbps: 800,
                peso_min: 3.0,
                peso_max: null,
                description: "Excelente para famílias com múltiplos dispositivos.",
            },
        ],
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
