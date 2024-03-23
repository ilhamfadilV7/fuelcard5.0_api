/*
  Warnings:

  - You are about to drop the column `ditrik_id` on the `kelurahan` table. All the data in the column will be lost.
  - Added the required column `distrik_id` to the `kelurahan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kelurahan" DROP COLUMN "ditrik_id",
ADD COLUMN     "distrik_id" INTEGER NOT NULL;
