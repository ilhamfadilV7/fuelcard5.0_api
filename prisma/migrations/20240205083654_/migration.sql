/*
  Warnings:

  - You are about to drop the column `bank` on the `data_permohonan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "data_permohonan" DROP COLUMN "bank",
ALTER COLUMN "foto_nib" DROP NOT NULL,
ALTER COLUMN "alamat_pengambilan_kartu" DROP NOT NULL;
