-- CreateTable
CREATE TABLE "running_text" (
    "id" BIGSERIAL NOT NULL,
    "isi_text" TEXT DEFAULT '',

    CONSTRAINT "running_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita" (
    "id_berita" BIGSERIAL NOT NULL,
    "tanggal_publish" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "judul" VARCHAR(255) DEFAULT '',
    "gambar" VARCHAR(255) DEFAULT '',
    "isi" TEXT DEFAULT '',

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id_berita")
);
