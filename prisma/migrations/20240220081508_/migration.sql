/*
  Warnings:

  - Added the required column `role` to the `m_user_bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_user_bank" ADD COLUMN     "role" TEXT NOT NULL;
