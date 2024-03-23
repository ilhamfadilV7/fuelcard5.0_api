/*
  Warnings:

  - Changed the type of `jumlah_alokasi` on the `alokasi_bbm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "alokasi_bbm" DROP COLUMN "jumlah_alokasi",
ADD COLUMN     "jumlah_alokasi" INTEGER NOT NULL;
