/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plano` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Venda" DROP CONSTRAINT "Venda_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Venda" DROP CONSTRAINT "Venda_plano_id_fkey";

-- DropTable
DROP TABLE "public"."Cliente";

-- DropTable
DROP TABLE "public"."Plano";

-- DropTable
DROP TABLE "public"."Venda";

-- CreateTable
CREATE TABLE "public"."Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "speed_mbps" INTEGER NOT NULL,
    "weightMin" DOUBLE PRECISION NOT NULL,
    "weightMax" DOUBLE PRECISION,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sale" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "PlanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gamer" BOOLEAN NOT NULL DEFAULT false,
    "phones" INTEGER NOT NULL,
    "computers" INTEGER NOT NULL,
    "smartTvs" INTEGER NOT NULL,
    "tvBox" INTEGER NOT NULL,
    "others" INTEGER NOT NULL,
    "weightTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "public"."Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_telephone_key" ON "public"."Client"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_clientId_key" ON "public"."Sale"("clientId");

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_PlanId_fkey" FOREIGN KEY ("PlanId") REFERENCES "public"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
