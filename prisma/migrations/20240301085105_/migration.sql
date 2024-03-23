/*
  Warnings:

  - You are about to alter the column `nama_pemohon` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `alamat_ktp` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `telepon` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `nomor_polisi` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `nama_pemilik` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `merek_kendaraan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `alamat_stnk` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `jenis_kendaraan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `model_kendaraan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `tahun_pembuatan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `isi_silinder` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `nomor_rangka` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `nomor_mesin` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `warna_kendaraan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `bahan_bakar` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `warna_tnkb` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `tahun_registrasi` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `nomor_bpkb` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `masa_berlaku` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `keterangan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `foto_depan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `foto_stnk` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `foto_ktp` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `foto_nib` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `provinsi` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `kota` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `penerbit` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `foto_surat_pernyataan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `foto_bukti_bayar_pbb` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `nomor_telepon_penanggung_jawab` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `status_keterangan` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - You are about to alter the column `tanggal_approve` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - The `tanggal_pengajuan` column on the `data_permohonan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `foto_npwp` on the `data_permohonan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(225)`.
  - The `tanggal_surat` column on the `surat_elektronik` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "alokasi_bbm" ADD COLUMN     "keterangan_pengambilan_kartu" VARCHAR(225) DEFAULT '',
ADD COLUMN     "kuota_last_date" TIMESTAMP(6),
ADD COLUMN     "nomor_kartu" VARCHAR(50) DEFAULT '',
ADD COLUMN     "nomor_rekening" VARCHAR(50) DEFAULT '',
ADD COLUMN     "sisa_kuota" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "data_permohonan" ADD COLUMN     "foto_samping" VARCHAR(225) DEFAULT '',
ADD COLUMN     "kode_bank" VARCHAR(10) DEFAULT '',
ADD COLUMN     "nomor_ktp" VARCHAR(50) DEFAULT '',
ALTER COLUMN "nama_pemohon" SET DEFAULT '',
ALTER COLUMN "nama_pemohon" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "alamat_ktp" SET DEFAULT '',
ALTER COLUMN "alamat_ktp" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "telepon" SET DEFAULT '',
ALTER COLUMN "telepon" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nomor_polisi" SET DEFAULT '',
ALTER COLUMN "nomor_polisi" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nama_pemilik" SET DEFAULT '',
ALTER COLUMN "nama_pemilik" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "merek_kendaraan" SET DEFAULT '',
ALTER COLUMN "merek_kendaraan" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "alamat_stnk" SET DEFAULT '',
ALTER COLUMN "alamat_stnk" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "jenis_kendaraan" SET DEFAULT '',
ALTER COLUMN "jenis_kendaraan" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "model_kendaraan" SET DEFAULT '',
ALTER COLUMN "model_kendaraan" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "tahun_pembuatan" SET DEFAULT '',
ALTER COLUMN "tahun_pembuatan" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "isi_silinder" SET DEFAULT '',
ALTER COLUMN "isi_silinder" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "nomor_rangka" SET DEFAULT '',
ALTER COLUMN "nomor_rangka" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "nomor_mesin" SET DEFAULT '',
ALTER COLUMN "nomor_mesin" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "warna_kendaraan" SET DEFAULT '',
ALTER COLUMN "warna_kendaraan" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "bahan_bakar" SET DEFAULT '',
ALTER COLUMN "bahan_bakar" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "warna_tnkb" SET DEFAULT '',
ALTER COLUMN "warna_tnkb" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "tahun_registrasi" SET DEFAULT '',
ALTER COLUMN "tahun_registrasi" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "nomor_bpkb" SET DEFAULT '',
ALTER COLUMN "nomor_bpkb" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "masa_berlaku" SET DEFAULT '',
ALTER COLUMN "masa_berlaku" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "keterangan" SET DEFAULT '',
ALTER COLUMN "keterangan" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "foto_depan" SET DEFAULT '',
ALTER COLUMN "foto_depan" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "foto_stnk" SET DEFAULT '',
ALTER COLUMN "foto_stnk" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "foto_ktp" SET DEFAULT '',
ALTER COLUMN "foto_ktp" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "foto_nib" SET DEFAULT '',
ALTER COLUMN "foto_nib" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "provinsi" SET DEFAULT '',
ALTER COLUMN "provinsi" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "kota" SET DEFAULT '',
ALTER COLUMN "kota" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "penerbit" SET DEFAULT '',
ALTER COLUMN "penerbit" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "foto_surat_pernyataan" SET DEFAULT '',
ALTER COLUMN "foto_surat_pernyataan" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "foto_bukti_bayar_pbb" SET DEFAULT '',
ALTER COLUMN "foto_bukti_bayar_pbb" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "nomor_telepon_penanggung_jawab" SET DEFAULT '',
ALTER COLUMN "nomor_telepon_penanggung_jawab" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "status_keterangan" SET DEFAULT '',
ALTER COLUMN "status_keterangan" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "tanggal_approve" SET DEFAULT '',
ALTER COLUMN "tanggal_approve" SET DATA TYPE VARCHAR(50),
DROP COLUMN "tanggal_pengajuan",
ADD COLUMN     "tanggal_pengajuan" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "foto_npwp" SET DEFAULT '',
ALTER COLUMN "foto_npwp" SET DATA TYPE VARCHAR(225);

-- AlterTable
ALTER TABLE "m_dinas" ADD COLUMN     "otorisasi" VARCHAR(50) NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "m_spbu" ADD COLUMN     "bank_id" VARCHAR(5) DEFAULT '';

-- AlterTable
ALTER TABLE "surat_elektronik" DROP COLUMN "tanggal_surat",
ADD COLUMN     "tanggal_surat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "tr_pengguna" (
    "id" BIGSERIAL NOT NULL,
    "bank_id" VARCHAR(10) NOT NULL DEFAULT '',
    "spbu_id" VARCHAR(25) NOT NULL DEFAULT '',
    "edc_id" VARCHAR(50) DEFAULT '',
    "no_pol" VARCHAR(10) NOT NULL DEFAULT '',
    "no_rek" VARCHAR(50) NOT NULL DEFAULT '',
    "card_id" VARCHAR(50) NOT NULL DEFAULT '',
    "jenis_bbm" VARCHAR(100) DEFAULT '',
    "wilayah" VARCHAR(100) DEFAULT '',
    "trx_id" VARCHAR(50) NOT NULL DEFAULT '',
    "trx_date" TIMESTAMP(6) NOT NULL,
    "jml_liter" INTEGER DEFAULT 0,
    "nominal_pembelian" DECIMAL(11,0) DEFAULT 0,
    "kuota_harian" INTEGER DEFAULT 0,
    "sisa_kuota" INTEGER DEFAULT 0,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "tr_pengguna_pkey" PRIMARY KEY ("id","bank_id","spbu_id","no_pol","no_rek","card_id","trx_id","trx_date")
);

-- CreateTable
CREATE TABLE "merk_kendaraan" (
    "id" BIGSERIAL NOT NULL,
    "brand" VARCHAR(100) NOT NULL DEFAULT '',

    CONSTRAINT "merk_kendaraan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_pembukaan_rekening" (
    "id" BIGSERIAL NOT NULL,
    "nik" VARCHAR(100) NOT NULL DEFAULT '',
    "kode_bank" VARCHAR(10) DEFAULT '',
    "nama_sesuai_ktp" VARCHAR(100) NOT NULL DEFAULT '',
    "nama_ibu_kandung" VARCHAR(100) NOT NULL DEFAULT '',
    "jenis_kelamin" INTEGER NOT NULL DEFAULT 1,
    "tempat_lahir" VARCHAR(225) NOT NULL DEFAULT '',
    "tanggal_lahir" VARCHAR(100) NOT NULL DEFAULT '',
    "alamat" VARCHAR(225) NOT NULL DEFAULT '',
    "status_alamat" VARCHAR(100) NOT NULL DEFAULT '',
    "provinsi" VARCHAR(100) NOT NULL DEFAULT '',
    "kota" VARCHAR(100) NOT NULL DEFAULT '',
    "kecamatan" VARCHAR(100) NOT NULL DEFAULT '',
    "kelurahan" VARCHAR(100) NOT NULL DEFAULT '',
    "kode_pos" VARCHAR(100) NOT NULL DEFAULT '',
    "npwp" VARCHAR(100) DEFAULT '999999999999999',
    "nomor_hp" VARCHAR(100) NOT NULL DEFAULT '',
    "email" VARCHAR(100) NOT NULL DEFAULT '',
    "agama" VARCHAR(100) NOT NULL DEFAULT '',
    "status_kawin" VARCHAR(100) NOT NULL DEFAULT '',
    "pendidikan_akhir" VARCHAR(100) NOT NULL DEFAULT '',
    "pekerjaan" VARCHAR(100) NOT NULL DEFAULT '',
    "tanggal_mulai_kerja" VARCHAR(100) DEFAULT '',
    "nomor_induk_pegawai" VARCHAR(100) DEFAULT '',
    "bidang_usaha" VARCHAR(100) NOT NULL DEFAULT '',
    "jabatan" VARCHAR(100) NOT NULL DEFAULT '',
    "nama_perusahaan" VARCHAR(100) DEFAULT '',
    "lokasi_usaha" VARCHAR(100) DEFAULT '',
    "provinsi_usaha" VARCHAR(100) DEFAULT '',
    "kota_kerja" VARCHAR(100) DEFAULT '',
    "penghasilan_perbulan" VARCHAR(100) NOT NULL DEFAULT '',
    "sumber_penghasilan" VARCHAR(100) NOT NULL DEFAULT '',
    "penghasilan_tambahan" VARCHAR(100) NOT NULL DEFAULT '',
    "frekuensi_setoran" VARCHAR(100) NOT NULL DEFAULT '',
    "rata_rata_setoran" VARCHAR(100) NOT NULL DEFAULT '',
    "frekuensi_penarikan" VARCHAR(100) NOT NULL DEFAULT '',
    "rata_rata_penarikan" VARCHAR(100) NOT NULL DEFAULT '',
    "tujuan_pembukaan_rekening" VARCHAR(100) DEFAULT '',

    CONSTRAINT "data_pembukaan_rekening_pkey" PRIMARY KEY ("id")
);
