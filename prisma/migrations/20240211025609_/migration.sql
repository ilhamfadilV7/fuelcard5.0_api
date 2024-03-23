-- CreateTable
CREATE TABLE "surat_elektronik" (
    "id_surat" SERIAL NOT NULL,
    "kop_surat" TEXT NOT NULL,
    "tanggal_surat" TEXT NOT NULL,
    "nama_pemohon" TEXT NOT NULL,
    "nomor_polisi" TEXT NOT NULL,
    "merk_kendaraan" TEXT NOT NULL,
    "tipe_kendaraan" TEXT NOT NULL,
    "kuota_bbm" INTEGER NOT NULL,

    CONSTRAINT "surat_elektronik_pkey" PRIMARY KEY ("id_surat")
);
