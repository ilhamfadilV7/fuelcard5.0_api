/*
  Warnings:

  - You are about to alter the column `isi` on the `berita` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `isi_text` on the `running_text` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - Made the column `isi_text` on table `running_text` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "berita" ALTER COLUMN "isi" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "running_text" ALTER COLUMN "isi_text" SET NOT NULL,
ALTER COLUMN "isi_text" SET DATA TYPE VARCHAR(1000);
