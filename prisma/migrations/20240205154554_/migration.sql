/*
  Warnings:

  - You are about to alter the column `nomor_rangka` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `nomor_mesin` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "data_permohonan" ALTER COLUMN "nomor_rangka" SET DATA TYPE INTEGER,
ALTER COLUMN "nomor_mesin" SET DATA TYPE INTEGER;
