/*
  Warnings:

  - Added the required column `tanggal_pengajuan` to the `data_permohonan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_permohonan" ADD COLUMN     "tanggal_approve" TEXT,
ADD COLUMN     "tanggal_pengajuan" TEXT NOT NULL;
