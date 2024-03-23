/*
  Warnings:

  - Added the required column `alamat_pengambilan_kartu` to the `data_permohonan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_permohonan" ADD COLUMN     "alamat_pengambilan_kartu" TEXT NOT NULL;
