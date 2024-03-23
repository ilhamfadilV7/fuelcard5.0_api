-- CreateTable
CREATE TABLE "m_pemohon" (
    "id" SERIAL NOT NULL,
    "nama_pemohon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "nomor_ktp" TEXT NOT NULL,
    "ibu_kandung" TEXT NOT NULL,
    "no_telepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "m_pemohon_pkey" PRIMARY KEY ("id")
);
