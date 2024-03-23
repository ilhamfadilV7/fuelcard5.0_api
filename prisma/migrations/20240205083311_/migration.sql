/*
  Warnings:

  - Added the required column `bank` to the `data_permohonan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_permohonan" ADD COLUMN     "bank" TEXT NOT NULL;
