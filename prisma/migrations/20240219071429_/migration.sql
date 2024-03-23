-- CreateTable
CREATE TABLE "dummy_nop" (
    "id" SERIAL NOT NULL,
    "nop" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "dummy_nop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "angka_permohonan" (
    "id" SERIAL NOT NULL,
    "total_permohonan" TEXT NOT NULL,
    "total_approved" TEXT NOT NULL,
    "total_pending" TEXT NOT NULL,
    "total_rejected" TEXT NOT NULL,

    CONSTRAINT "angka_permohonan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluasi_bank" (
    "id" SERIAL NOT NULL,
    "nama_bank" TEXT NOT NULL,
    "total_kartu_terbit" TEXT NOT NULL,
    "total_kartu_diproses" TEXT NOT NULL,

    CONSTRAINT "evaluasi_bank_pkey" PRIMARY KEY ("id")
);
