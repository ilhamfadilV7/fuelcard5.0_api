-- CreateTable
CREATE TABLE "m_dinas" (
    "id" SERIAL NOT NULL,
    "nama_dinas" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "m_dinas_pkey" PRIMARY KEY ("id")
);
