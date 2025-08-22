/*
  Warnings:

  - You are about to drop the column `computers` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `phones` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `smartTvs` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `tvBox` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Sale" DROP COLUMN "computers",
DROP COLUMN "others",
DROP COLUMN "phones",
DROP COLUMN "smartTvs",
DROP COLUMN "tvBox";

-- CreateTable
CREATE TABLE "public"."Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SaleDevice" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SaleDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "public"."Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SaleDevice_saleId_deviceId_key" ON "public"."SaleDevice"("saleId", "deviceId");

-- AddForeignKey
ALTER TABLE "public"."SaleDevice" ADD CONSTRAINT "SaleDevice_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleDevice" ADD CONSTRAINT "SaleDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
