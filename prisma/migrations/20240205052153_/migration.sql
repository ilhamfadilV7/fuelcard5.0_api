/*
  Warnings:

  - Added the required column `role` to the `m_pemohon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_pemohon" ADD COLUMN     "role" TEXT NOT NULL;
