/*
  Warnings:

  - You are about to drop the column `foto_fc_kuning` on the `data_permohonan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "data_permohonan" DROP COLUMN "foto_fc_kuning",
ADD COLUMN     "foto_bukti_bayar_pbb" TEXT,
ADD COLUMN     "nomor_telepon_penanggung_jawab" TEXT,
ALTER COLUMN "nama_pemohon" DROP NOT NULL,
ALTER COLUMN "alamat_ktp" DROP NOT NULL,
ALTER COLUMN "telepon" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "status_permohonan" DROP NOT NULL,
ALTER COLUMN "nomor_polisi" DROP NOT NULL,
ALTER COLUMN "nama_pemilik" DROP NOT NULL,
ALTER COLUMN "merek_kendaraan" DROP NOT NULL,
ALTER COLUMN "alamat_stnk" DROP NOT NULL,
ALTER COLUMN "jenis_kendaraan" DROP NOT NULL,
ALTER COLUMN "model_kendaraan" DROP NOT NULL,
ALTER COLUMN "tahun_pembuatan" DROP NOT NULL,
ALTER COLUMN "isi_silinder" DROP NOT NULL,
ALTER COLUMN "nomor_rangka" DROP NOT NULL,
ALTER COLUMN "nomor_mesin" DROP NOT NULL,
ALTER COLUMN "warna_kendaraan" DROP NOT NULL,
ALTER COLUMN "bahan_bakar" DROP NOT NULL,
ALTER COLUMN "warna_tnkb" DROP NOT NULL,
ALTER COLUMN "tahun_registrasi" DROP NOT NULL,
ALTER COLUMN "nomor_bpkb" DROP NOT NULL,
ALTER COLUMN "masa_berlaku" DROP NOT NULL,
ALTER COLUMN "jumlah_roda" DROP NOT NULL,
ALTER COLUMN "foto_depan" DROP NOT NULL,
ALTER COLUMN "foto_stnk" DROP NOT NULL,
ALTER COLUMN "foto_ktp" DROP NOT NULL,
ALTER COLUMN "foto_samping" DROP NOT NULL,
ALTER COLUMN "provinsi" DROP NOT NULL,
ALTER COLUMN "kota" DROP NOT NULL,
ALTER COLUMN "penerbit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "m_pemohon" ADD COLUMN     "Nop" TEXT,
ALTER COLUMN "ibu_kandung" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "m_user_bank" (
    "id_user_bank" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "no_telepon" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "m_user_bank_pkey" PRIMARY KEY ("id_user_bank")
);
