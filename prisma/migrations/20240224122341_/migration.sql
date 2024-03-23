-- CreateTable
CREATE TABLE "m_bank" (
    "bank_id" VARCHAR(5) NOT NULL,
    "nama_bank" VARCHAR(100) DEFAULT '',
    "telp" VARCHAR(15) DEFAULT '',
    "alamat" VARCHAR(225) DEFAULT '',
    "keterangan" VARCHAR(50) DEFAULT '',
    "status" INTEGER DEFAULT 1,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "m_bank_pkey" PRIMARY KEY ("bank_id")
);

-- CreateTable
CREATE TABLE "m_bank_h2h" (
    "id" BIGSERIAL NOT NULL,
    "bank_id" VARCHAR(5) NOT NULL,
    "username" VARCHAR(100) DEFAULT '',
    "user_password" VARCHAR(225) DEFAULT '',
    "keterangan" VARCHAR(150) DEFAULT '',
    "status" INTEGER DEFAULT 1,
    "last_login" TIMESTAMP(6),
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "m_bank_h2h_pkey" PRIMARY KEY ("id","bank_id")
);

-- CreateTable
CREATE TABLE "m_spbu" (
    "id" BIGSERIAL NOT NULL,
    "spbu_id" VARCHAR(50) NOT NULL,
    "nama" VARCHAR(150) DEFAULT '',
    "alamat" VARCHAR(225) DEFAULT '',
    "lat" VARCHAR(150) DEFAULT '',
    "long" VARCHAR(150) DEFAULT '',
    "keterangan" VARCHAR(150) DEFAULT '',
    "status" INTEGER DEFAULT 1,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "m_spbu_pkey" PRIMARY KEY ("id","spbu_id")
);

-- CreateTable
CREATE TABLE "m_spbu_edc" (
    "id" BIGSERIAL NOT NULL,
    "spbu_id" VARCHAR(50) NOT NULL,
    "edc_id" VARCHAR(150) NOT NULL DEFAULT '',
    "keterangan" VARCHAR(150) DEFAULT '',
    "status" INTEGER DEFAULT 1,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "m_spbu_edc_pkey" PRIMARY KEY ("id","spbu_id","edc_id")
);
