/*
  Warnings:

  - You are about to drop the column `email` on the `m_user_otp` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `m_user_otp` table. All the data in the column will be lost.
  - Added the required column `no_telepon` to the `m_user_otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_user_otp" DROP COLUMN "email",
DROP COLUMN "role",
ADD COLUMN     "no_telepon" TEXT NOT NULL;
