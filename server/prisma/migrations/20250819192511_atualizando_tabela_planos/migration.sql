/*
  Warnings:

  - Added the required column `description` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cliente" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
