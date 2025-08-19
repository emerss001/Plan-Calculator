/*
  Warnings:

  - You are about to drop the column `description` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `description` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cliente" DROP COLUMN "description",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "public"."Plano" ADD COLUMN     "description" TEXT NOT NULL;
