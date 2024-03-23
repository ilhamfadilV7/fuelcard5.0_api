-- CreateTable
CREATE TABLE "provinsi" (
    "id" SERIAL NOT NULL,
    "nama_provinsi" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "provinsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kota_kabupaten" (
    "id" SERIAL NOT NULL,
    "provinsi_id" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "kota_kabupaten_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kecamatan" (
    "id" SERIAL NOT NULL,
    "regensi_id" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "kecamatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kelurahan" (
    "id" SERIAL NOT NULL,
    "ditrik_id" INTEGER NOT NULL,
    "nama_kelurahan" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "kelurahan_pkey" PRIMARY KEY ("id")
);
