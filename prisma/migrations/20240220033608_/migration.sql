/*
  Warnings:

  - Added the required column `nama` to the `dummy_nop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_telepon` to the `dummy_nop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dummy_nop" ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "no_telepon" TEXT NOT NULL;
