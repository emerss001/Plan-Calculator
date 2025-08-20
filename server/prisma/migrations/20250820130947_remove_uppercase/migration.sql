/*
  Warnings:

  - You are about to drop the column `PlanId` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `planId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Sale" DROP CONSTRAINT "Sale_PlanId_fkey";

-- AlterTable
ALTER TABLE "public"."Sale" DROP COLUMN "PlanId",
ADD COLUMN     "planId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
