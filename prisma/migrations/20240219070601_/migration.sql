/*
  Warnings:

  - You are about to drop the column `Nop` on the `m_pemohon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "m_pemohon" DROP COLUMN "Nop",
ADD COLUMN     "nop" TEXT;
