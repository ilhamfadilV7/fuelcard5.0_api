/*
  Warnings:

  - You are about to drop the column `foto_samping` on the `data_permohonan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "data_permohonan" DROP COLUMN "foto_samping",
ADD COLUMN     "foto_npwp" TEXT;
