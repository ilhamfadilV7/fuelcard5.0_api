-- CreateTable
CREATE TABLE "alokasi_bbm" (
    "id" SERIAL NOT NULL,
    "nomor_polisi" TEXT NOT NULL,
    "nama_pemohon" TEXT NOT NULL,
    "jumlah_alokasi" TEXT NOT NULL,

    CONSTRAINT "alokasi_bbm_pkey" PRIMARY KEY ("id")
);
