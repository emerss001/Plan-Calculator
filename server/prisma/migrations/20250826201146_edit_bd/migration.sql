/*
  Warnings:

  - You are about to drop the column `weightTotal` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaleDevice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalDevices` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SaleDevice" DROP CONSTRAINT "SaleDevice_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SaleDevice" DROP CONSTRAINT "SaleDevice_saleId_fkey";

-- AlterTable
ALTER TABLE "public"."Client" ADD COLUMN     "lastSaleDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Sale" DROP COLUMN "weightTotal",
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalDevices" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Device";

-- DropTable
DROP TABLE "public"."SaleDevice";
