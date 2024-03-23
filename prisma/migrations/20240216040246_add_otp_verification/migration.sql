-- CreateTable
CREATE TABLE "m_user_otp" (
    "id_otp" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,

    CONSTRAINT "m_user_otp_pkey" PRIMARY KEY ("id_otp")
);
