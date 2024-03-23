/*
  Warnings:

  - You are about to alter the column `ibu_kandung` on the `m_pemohon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `m_pemohon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `nop` on the `m_pemohon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "m_pemohon" ADD COLUMN     "status_permohonan" VARCHAR(100) DEFAULT '',
ALTER COLUMN "ibu_kandung" SET DEFAULT '',
ALTER COLUMN "ibu_kandung" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "nop" SET DEFAULT '',
ALTER COLUMN "nop" SET DATA TYPE VARCHAR(100);
