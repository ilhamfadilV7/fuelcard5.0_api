const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { json, query } = require("express");
const saltRounds = 10;
const otpGenerator = require("otp-generator");
const passwordGenerator = require("otp-generator");

const router = require("express").Router();
const salt = bcrypt.genSaltSync(saltRounds);

router.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
  res.send({ message: "Ok api is working ??" });
});

//GET ALL BRAND
router.get("/v1/merk_kendaraan/", async (req, res, next) => {
  try {
    const get_all = await prisma.$queryRaw`SELECT brand FROM merk_kendaraan`;

    res.status(200).send({
      status: 200,
      message: "Success",
      data: get_all,
    });
  } catch (error) {
    next(error);
  }
});

//GET LINK BY WHATSSAP
router.post("/user/onboard/", async (req, res, next) => {
  const { nama, no_telepon } = req.body;

  res.send({
    status: 200,
    message: `Link Formulir Pendaftaran berhasil dikirim melalui Whatssap !. `,
  });

  var teks_onboarding = `Hallo *${nama}*, \nSelamat Datang di *Batam Fuel Card 5.0* \n\nSilahkan lanjutkan pendaftaran anda melalui link berikut : \n https://batamfuelcard.id/register/`;

  const url = "https://app.whacenter.com/api/send";
  const data = {
    device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
    number: `${no_telepon}`,
    message: `${teks_onboarding}`,
  };
  const customHeaders = {
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

//GET PROFILE PEMOHON BY ID
router.get("/v1/merk_kendaraan/", async (req, res, next) => {
  try {
    const get_all = await prisma.$queryRaw`SELECT brand FROM merk_kendaraan`;

    res.status(200).send({
      status: 200,
      message: "Success",
      data: get_all,
    });
  } catch (error) {
    next(error);
  }
});

// Ganti password Pemohon
router.post("/v1/setting/ganti_password/pemohon/", async (req, res, next) => {
  const { no_telepon, password_lama, password_baru } = req.body;

  try {
    const check =
      await prisma.$queryRaw`SELECT nama_pemohon, no_telepon, password FROM m_pemohon WHERE no_telepon = ${no_telepon}`;
    if (check.length === 0) {
      res.status(401).send({
        status: 401,
        message: `Maaf, Data dengan nomor telepon ${check} tidak ditemukan.`,
        data: check,
      });
    } else {
      const old_pw_compare = await bcrypt.compare(
        password_lama,
        check[0].password
      );

      if (old_pw_compare == true) {
        //change password
        const new_pw_hash = bcrypt.hashSync(password_baru, salt);
        const change_pw =
          await prisma.$executeRaw`UPDATE m_pemohon SET password = ${new_pw_hash} WHERE no_telepon = ${no_telepon}`;

        if (change_pw == 1) {
          res.status(200).send({
            status: 200,
            message: `Password berhasil dirubah !`,
          });
        } else {
          res.status(501).send({
            status: 501,
            message: `Terjadi Kesalahan pada Server. Coba lagi dalam beberapa saat`,
          });
        }
      } else {
        res.status(400).send({
          status: 400,
          message: `Maaf, Kata Sandi yang anda masukan salah, pastikan anda memasukan Kata Sandi dengan benar`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

//Reset password pemohon/lupa kata sandi
router.post("/v1/reset_password/", async (req, res, next) => {
  const { no_telepon } = req.body;
  try {
    //check
    const checkifexist =
      await prisma.$queryRaw`select nama_pemohon, no_telepon from m_pemohon where no_telepon = ${no_telepon} `;
    if (checkifexist.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Terjadi Kesalahan, Akun dengan nomor ${no_telepon} tidak ditemukan`,
      });
    } else {
      //reset password
      const reset =
        await prisma.$executeRaw`UPDATE m_pemohon set password = 0 WHERE no_telepon = ${no_telepon}`;

      //change_rand_password
      const pwd = passwordGenerator.generate(8, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: true,
      });

      //change_into_rand
      const rand_pwd_hash = bcrypt.hashSync(pwd, salt);
      const update =
        await prisma.$executeRaw`UPDATE m_pemohon set password = ${rand_pwd_hash} WHERE no_telepon = ${no_telepon}`;

      res.status(200).send({
        status: 200,
        message: `password baru berhasil dikirim melalui nomor whatssap anda`,
      });

      var teks_reset = `Halo *${checkifexist[0].nama_pemohon}* \nAnda telah melakukan reset password. \npassword baru anda adalah *${pwd}* \nSilahkan login ke akun anda dan rubah password.\n\nTerima Kasih`;
      const url = "https://app.whacenter.com/api/send";
      const data = {
        device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
        number: `${no_telepon}`,
        // message: `Hallo ${nama_pemohon}. Permohonan fuel card anda dengan nomor kendaraan ${nomor_polisi} sudah terkirim, mohon menunggu sampai petugas melakukan verifikasi data anda terlebih dahulu`
        message: `${teks_reset}`,
      };
      const customHeaders = {
        "Content-Type": "application/json",
      };
      fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  } catch (error) {
    next(error);
  }
});

//GET DATA SEMUA DINAS
router.get("/v1/data/dinas", async (req, res, next) => {
  try {
    const getAll = await prisma.$queryRaw`SELECT * FROM m_dinas `;

    res.status(200).send({
      status: 200,
      message: `Success`,
      data_pemohon: getAll,
    });
  } catch (error) {
    next(error);
  }
});

//GET_ALL_BY_PAGE
router.get("/v1/all_data/pemohon/page", async (req, res, next) => {
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 2;
  const last_page = req.query.last_page;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result = {};
  const totalCount = await prisma.data_permohonan.count();
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;
  try {
    if (page < 0) {
      return res.status(400).json("Nomor page tidak boleh negatif");
    } else if (page === 1 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.paginateData = await prisma.data_permohonan.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (endIndex < totalCount && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.paginateData = await prisma.data_permohonan.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (startIndex > 0 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.previous = {
        page: page - 1,
        limit: limit,
      };
      result.paginateData = await prisma.data_permohonan.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (last_page === "true" && page === totalPage) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = totalPage;
      result.last = {
        page: totalPage,
        limit: limit,
      };
      result.paginateData = await prisma.data_permohonan.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.paginateData).length;
      result.range = totalCount;
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/v1/registrasi/dinas", async (req, res, next) => {
  const { nama_dinas, email, password, otorisasi } = req.body;

  try {
    const checkDinas =
      await prisma.$queryRaw`SELECT nama_dinas , email FROM m_dinas WHERE nama_dinas = ${nama_dinas} AND email = ${email} `;

    if (checkDinas.length == 0) {
      const hash = bcrypt.hashSync(password, salt);

      const dinasRegistrasi =
        await prisma.$executeRaw`INSERT INTO m_dinas (nama_dinas, email, password, role, otorisasi) VALUES ( ${nama_dinas}, ${email}, ${hash}, 'dinas', ${otorisasi}) `;

      res.status(201).send({
        status: 201,
        message: "Registrasi Akun Berhasil. Silahkan Login",
      });
    } else {
      res.status(400).send({
        status: 400,
        message: `Error. Petugas dengan nama ${checkDinas[0].nama_dinas} sudah terdaftar !`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/v1/registrasi", async (req, res, next) => {
  const {
    nama_pemohon,
    jenis_permohonan,
    alamat,
    nomor_ktp,
    ibu_kandung,
    no_telepon,
    email,
    nop,
    password,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
  } = req.body;

  try {
    const check_KTP =
      await prisma.$queryRaw`SELECT nomor_ktp FROM m_pemohon WHERE nomor_ktp = ${nomor_ktp}`;
    if (check_KTP.length === 1) {
      const check_No_HP =
        await prisma.$queryRaw`SELECT no_telepon FROM m_pemohon WHERE no_telepon = ${no_telepon}`;
      if (check_No_HP.length) {
        res.status(400).send({
          status: 400,
          message: `Nomor ini sudah terdaftar. Mohon gunakan nomor lain yang aktif menggunakan whatssap 1`,
        });
      } else {
        res.status(400).send({
          status: 400,
          message: `User dengan nomor KTP ${check_KTP[0].nomor_ktp} sudah terdaftar ! 1`,
        });
      }
    } else {
      const check_No_HP =
        await prisma.$queryRaw`SELECT no_telepon FROM m_pemohon WHERE no_telepon = ${no_telepon}`;
      if (check_No_HP.length) {
        res.status(400).send({
          status: 400,
          message: `Nomor ini sudah terdaftar. Mohon gunakan nomor lain yang aktif menggunakan whatssap 2`,
        });
      } else {
        const hash = bcrypt.hashSync(password, salt);
        const registrasi =
          await prisma.$executeRaw`INSERT INTO m_pemohon (nama_pemohon, status_permohonan, alamat, nomor_ktp, ibu_kandung, no_telepon, email, nop, password, provinsi, kota, kecamatan, kelurahan, role) VALUES (${nama_pemohon}, ${jenis_permohonan}, ${alamat}, ${nomor_ktp}, ${ibu_kandung}, ${no_telepon}, ${email}, ${nop}, ${hash},  ${provinsi}, ${kota}, ${kecamatan}, ${kelurahan}, 'pemohon')`;

        res.status(201).send({
          status: 201,
          message: "Registrasi Akun Berhasil. Silahkan Login",
        });
      }

      var teks_registered = `Kepada Yth. *${nama_pemohon}* \nSelamat, Akun Fuel Card anda telah berhasil di registrasi \nSilahkan login ke dashboard anda untuk melanjutkan pendaftaran fuel card 5.0 \n\nTerima Kasih`;

      const url = "https://app.whacenter.com/api/send";
      const data = {
        device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
        number: `${no_telepon}`,
        message: teks_registered,
        // message: `Kepada Yth. ${nama_pemohon}.     Selamat, Akun Fuel Card anda berhasil di registrasi.      Silahkan lanjutkan login ke dashboard anda.      Terima Kasih `
      };
      const customHeaders = {
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  } catch (error) {
    next(error);
  }
});

//LOGIN-SECTIONS
router.post("/v1/login", async (req, res, next) => {
  const {
    user, //Nomor HP / NOMOR POLISI / Nama Lengkap / EMAIL
    password,
  } = req.body;

  try {
    const login =
      await prisma.$queryRaw`SELECT id, nama_pemohon, alamat, no_telepon, email, password, role FROM m_pemohon WHERE email = ${user} OR no_telepon = ${user} OR nama_pemohon = ${user}`;

    if (login.length === 1) {
      const pemohon_match = await bcrypt.compare(password, login[0].password);
      if (pemohon_match === true) {
        //send otp
        const otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });

        const getOTP =
          await prisma.$queryRaw`SELECT no_telepon from m_user_otp WHERE no_telepon = ${login[0].no_telepon}`;

        //checkifotpexist
        if (getOTP.length === 0) {
          //save otp to db
          const saveOTP =
            await prisma.$executeRaw`INSERT INTO m_user_otp (no_telepon, otp) VALUES (${login[0].no_telepon}, ${otp})`;
        } else {
          const saveOTP =
            await prisma.$executeRaw`UPDATE m_user_otp SET otp = ${otp} WHERE no_telepon = ${login[0].no_telepon}`;
        }

        var teks_otp = `Kode Verifikasi OTP anda adalah *${otp}*.\nJangan berikan kode OTP anda *KEPADA SIAPAPUN* termasuk kepada petugas \n\nTerima Kasih`;
        const url = "https://app.whacenter.com/api/send";
        const data = {
          device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
          number: `${login[0].no_telepon}`,
          message: `${teks_otp}`,
        };
        const customHeaders = {
          "Content-Type": "application/json",
        };

        fetch(url, {
          method: "POST",
          headers: customHeaders,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });

        res.status(202).send({
          status: 202,
          message: `OTP berhasil dikirimkan ke nomor ${login[0].no_telepon}`,
        });
      } else if (pemohon_match == false) {
        res.status(406).send({
          status: 406,
          message: "Error. Nomor Handphone atau password salah",
        });
      }
    } else if (login.length === 0) {
      const check_dinas =
        await prisma.$queryRaw`SELECT id, email, password, role, otorisasi FROM m_dinas WHERE email = ${user}`;

      if (check_dinas.length === 0) {
        const check_bank =
          await prisma.$queryRaw`SELECT id_user_bank, nama, no_telepon, password, role, otorisasi, kode_bank FROM m_user_bank WHERE no_telepon = ${user} OR email = ${user}`;

        if (check_bank.length === 1) {
          const bank_match = await bcrypt.compare(
            password,
            check_bank[0].password
          );
          if (bank_match == true) {
            res.status(200).send({
              status: 200,
              message: `Login berhasil !. anda akan masuk ke halaman dashboard`,
              data: check_bank[0],
            });
          } else {
            res.status(406).send({
              status: 406,
              message: "Error. Akun atau password salah",
            });
          }
        } else {
          res.status(404).send({
            status: 404,
            message: `Error. Akun tidak ditemukan atau belum terdaftar`,
          });
        }
      } else {
        const dinas_match = await bcrypt.compare(
          password,
          check_dinas[0].password
        );
        if (dinas_match == true) {
          res.status(202).send({
            status: 202,
            message: `Login berhasil !. anda akan masuk ke halaman dashboard`,
            data: check_dinas[0],
          });
        } else {
          res.status(406).send({
            status: 406,
            message: "Error. Akun atau password salah",
          });
        }
      }
    } else {
      res.status(404).send({
        status: 404,
        message: `Error. Akun atau password salah`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//VERIF OTP LOGIN
router.post("/v1/login/enter_otp", async (req, res, next) => {
  const { no_telepon, otp } = req.body;

  try {
    const verifOTP =
      await prisma.$queryRaw`SELECT id_otp, otp, no_telepon FROM m_user_otp WHERE no_telepon = ${no_telepon} AND otp = ${otp}`;

    if (verifOTP.length === 0) {
      res.status(400).send({
        status: 400,
        message: `Kode OTP tidak benar atau sudah tidak berlaku`,
      });
    } else {
      const login_data =
        await prisma.$queryRaw`SELECT nama_pemohon, alamat, nomor_ktp, no_telepon, email, role FROM m_pemohon WHERE no_telepon = ${verifOTP[0].no_telepon}`;

      const clear_OTP =
        await prisma.$executeRaw`UPDATE m_user_otp SET otp = 0 WHERE no_telepon = ${verifOTP[0].no_telepon}`;

      res.send({
        status: 200,
        message: `Anda Berhasil Login`,
        data: login_data[0],
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/v1/pengajuan_fuelcard/", async (req, res, next) => {
  try {
    const {
      nama_pemohon,
      nomor_ktp,
      alamat_ktp,
      telepon,
      no_penanggung_jawab,
      email,
      status_keterangan,
      tanggal_approve,
      nomor_polisi,
      nama_pemilik,
      merek_kendaraan,
      alamat_stnk,
      jenis_kendaraan,
      model_kendaraan,
      tahun_pembuatan,
      isi_silinder,
      nomor_rangka,
      nomor_mesin,
      warna_kendaraan,
      bahan_bakar,
      warna_tnkb,
      tahun_registrasi,
      nomor_bpkb,
      masa_berlaku,
      jumlah_roda,
      keterangan,
      foto_depan,
      foto_samping,
      foto_stnk,
      foto_ktp,
      foto_bukti_bayar_pbb,
      foto_npwp,
      foto_nib,
      provinsi,
      kota,
      penerbit,
    } = req.body;

    const check_nopol =
      await prisma.$queryRaw`SELECT nomor_polisi FROM data_permohonan WHERE nomor_polisi = ${nomor_polisi}`;

    if (check_nopol.length === 1) {
      res.status(403).send({
        status: 403,
        message: `Peringatan, Nomor Polisi sudah terdaftar !`,
      });
    } else {
      const pengajuan = await prisma.$executeRaw`INSERT INTO data_permohonan 
      ( nama_pemohon,nomor_ktp,alamat_ktp,telepon,nomor_telepon_penanggung_jawab,email,status_permohonan,status_keterangan,tanggal_approve,nomor_polisi,nama_pemilik,merek_kendaraan,alamat_stnk,jenis_kendaraan,model_kendaraan,tahun_pembuatan ,
        isi_silinder,nomor_rangka,nomor_mesin,warna_kendaraan,bahan_bakar,warna_tnkb,tahun_registrasi,nomor_bpkb,masa_berlaku,
        jumlah_roda,keterangan,foto_depan,foto_samping,foto_stnk,foto_ktp,foto_bukti_bayar_pbb,foto_npwp,foto_nib,provinsi,kota,penerbit ) VALUES 
        
        (${nama_pemohon},${nomor_ktp},${alamat_ktp},${telepon},${no_penanggung_jawab},${email},0,${status_keterangan},${tanggal_approve},${nomor_polisi},${nama_pemilik},${merek_kendaraan},${alamat_stnk},${jenis_kendaraan},
          ${model_kendaraan},${tahun_pembuatan},${isi_silinder},${nomor_rangka},${nomor_mesin},${warna_kendaraan},${bahan_bakar},${warna_tnkb},${tahun_registrasi},${nomor_bpkb},
          ${masa_berlaku},${jumlah_roda},${keterangan},${foto_depan},${foto_samping},${foto_stnk},${foto_ktp},${foto_bukti_bayar_pbb},${foto_npwp},${foto_nib},${provinsi},${kota},${penerbit})
        `;

      // if(pengajuan == 1){
      //   // Notifikasi untuk dinas saat ada pengajuan masuk.
      //   const msg_dinas = await prisma.$executeRaw
      //   `INSERT INTO notifikasi values (notifikasi, flag_notif, createdAt, msg_for ) VALUES ('' )`

      // }

      res.status(200).send({
        status: 200,
        message:
          "Pengajuan anda sudah terkirim. Petugas akan melakukan verifikasi data terlebih dahulu.",
      });

      var teks_pengajuan = `Hallo *${nama_pemohon}*. \nPengajuan fuelcard anda dengan nomor polisi *${nomor_polisi}* sudah terkirim \nMohon menunggu petugas untuk melakukan verifikasi data pengajuan anda terlebih dahulu. \n\nTerima Kasih`;
      //send wa
      const url = "https://app.whacenter.com/api/send";
      const data = {
        device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
        number: `${telepon}`,
        // message: `Hallo ${nama_pemohon}. Permohonan fuel card anda dengan nomor kendaraan ${nomor_polisi} sudah terkirim, mohon menunggu sampai petugas melakukan verifikasi data anda terlebih dahulu`
        message: `${teks_pengajuan}`,
      };
      const customHeaders = {
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  } catch (error) {
    next(error);
  }
});

//INSERT DATA PEMBUKAAN REKENING
router.post("/v1/data/pembukaan_rekening/", async (req, res, next) => {
  const {
    nik,
    nopol,
    kode_bank,
    nama_sesuai_ktp,
    nama_ibu_kandung,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    status_alamat,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kode_pos,
    npwp,
    nomor_hp,
    email,
    agama,
    status_kawin,
    pendidikan_akhir,
    pekerjaan,
    tanggal_mulai_kerja,
    nomor_induk_pegawai,
    bidang_usaha,
    jabatan,
    nama_perusahaan,
    lokasi_usaha,
    provinsi_usaha,
    kota_kerja,
    penghasilan_perbulan,
    sumber_penghasilan,
    penghasilan_tambahan,
    frekuensi_setoran,
    rata_rata_setoran,
    frekuensi_penarikan,
    rata_rata_penarikan,
    tujuan_pembukaan_rekening,
  } = req.body;

  try {
    const checkifExist =
      await prisma.$queryRaw`SELECT nopol, nama_sesuai_ktp FROM data_pembukaan_rekening WHERE nopol = ${nopol}`;

    if (checkifExist.length === 1) {
      res.status(404).send({
        status: 404,
        message: `Terjadi Kesalahan, Nomor polisi ${nopol} sudah mendaftarkan Fuel Card.`,
      });
    } else {
      const insert_data =
        await prisma.$executeRaw`INSERT INTO data_pembukaan_rekening (
            nik, 
            nopol,                  
            kode_bank,            
            nama_sesuai_ktp,         
            nama_ibu_kandung,     
            jenis_kelamin,       
            tempat_lahir,         
            tanggal_lahir,          
            alamat,              
            status_alamat,          
            provinsi,              
            kota,               
            kecamatan,             
            kelurahan,              
            kode_pos,              
            npwp,               
            nomor_hp,              
            email,               
            agama,           
            status_kawin,          
            pendidikan_akhir,     
            pekerjaan,          
            tanggal_mulai_kerja,  
            nomor_induk_pegawai,   
            bidang_usaha,       
            jabatan,        
            nama_perusahaan,      
            lokasi_usaha,       
            provinsi_usaha,        
            kota_kerja,         
            penghasilan_perbulan,  
            sumber_penghasilan,   
            penghasilan_tambahan,  
            frekuensi_setoran,   
            rata_rata_setoran,   
            frekuensi_penarikan,  
            rata_rata_penarikan,  
            tujuan_pembukaan_rekening )  
            
           VALUES (
            ${nik},
            ${nopol},
            ${kode_bank},
            ${nama_sesuai_ktp},
            ${nama_ibu_kandung},
            ${jenis_kelamin},
            ${tempat_lahir},
            ${tanggal_lahir},
            ${alamat},
            ${status_alamat},
            ${provinsi},
            ${kota},
            ${kecamatan},
            ${kelurahan},
            ${kode_pos},
            ${npwp},
            ${nomor_hp},
            ${email},
            ${agama},
            ${status_kawin},
            ${pendidikan_akhir},
            ${pekerjaan},
            ${tanggal_mulai_kerja},
            ${nomor_induk_pegawai},
            ${bidang_usaha},
            ${jabatan},
            ${nama_perusahaan},
            ${lokasi_usaha},
            ${provinsi_usaha},
            ${kota_kerja},
            ${penghasilan_perbulan},
            ${sumber_penghasilan},
            ${penghasilan_tambahan},
            ${frekuensi_setoran},
            ${rata_rata_setoran},
            ${frekuensi_penarikan},
            ${rata_rata_penarikan},
            ${tujuan_pembukaan_rekening}
           ); `;

      res.status(200).send({
        status: 200,
        message: `Data berhasil dikirimkan !`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/v1/data/nasabah/", async (req, res, next) => {
  try {
    const getAll =
      await prisma.$queryRaw`SELECT nik,nopol,kode_bank,nama_sesuai_ktp,nama_ibu_kandung,jenis_kelamin,tempat_lahir,tanggal_lahir,alamat,status_alamat,provinsi,kota,kecamatan,kelurahan,kode_pos,npwp,nomor_hp,email,agama,status_kawin,          
      pendidikan_akhir,pekerjaan,tanggal_mulai_kerja,nomor_induk_pegawai,bidang_usaha,jabatan,nama_perusahaan,lokasi_usaha,provinsi_usaha,kota_kerja,penghasilan_perbulan,sumber_penghasilan,penghasilan_tambahan,  
      frekuensi_setoran,rata_rata_setoran,frekuensi_penarikan,rata_rata_penarikan,tujuan_pembukaan_rekening FROM data_pembukaan_rekening`;

    res.status(200).send({
      status: 200,
      message: `Success`,
      data: getAll,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/v1/data/nasabah/by_nopol", async (req, res, next) => {
  const { nopol } = req.body;
  try {
    const get_by_nik =
      await prisma.$queryRaw`SELECT nik,nopol,kode_bank,nama_sesuai_ktp,nama_ibu_kandung,jenis_kelamin,tempat_lahir,tanggal_lahir,alamat,status_alamat,provinsi,kota,kecamatan,kelurahan,kode_pos,npwp,nomor_hp,email,agama,status_kawin,          
      pendidikan_akhir,pekerjaan,tanggal_mulai_kerja,nomor_induk_pegawai,bidang_usaha,jabatan,nama_perusahaan,lokasi_usaha,provinsi_usaha,kota_kerja,penghasilan_perbulan,sumber_penghasilan,penghasilan_tambahan,  
      frekuensi_setoran,rata_rata_setoran,frekuensi_penarikan,rata_rata_penarikan,tujuan_pembukaan_rekening, status FROM data_pembukaan_rekening WHERE nopol = ${nopol}`;

    if (get_by_nik.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Maaf, Data nasabah tidak ditemukan`,
        data: getAll,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: `Success`,
        data: get_by_nik[0],
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/v1/verifikasi/data/nasabah/", async (req, res, next) => {
  const {
    nopol,
    status,
    rencana_tanggal_kedatangan,
    waktu_kedatangan,
    alamat_pengambilan,
    alasan_reject,
  } = req.body;
  const dt = new Date();
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
  var curdate = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(
    dt.getDate()
  )} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`;

  try {
    const get_by_nik =
      await prisma.$queryRaw`SELECT nik,nopol,kode_bank,nama_sesuai_ktp,nama_ibu_kandung,jenis_kelamin,tempat_lahir,tanggal_lahir,alamat,status_alamat,provinsi,kota,kecamatan,kelurahan,kode_pos,npwp,nomor_hp,email,agama,status_kawin,          
      pendidikan_akhir,pekerjaan,tanggal_mulai_kerja,nomor_induk_pegawai,bidang_usaha,jabatan,nama_perusahaan,lokasi_usaha,provinsi_usaha,kota_kerja,penghasilan_perbulan,sumber_penghasilan,penghasilan_tambahan,  
      frekuensi_setoran,rata_rata_setoran,frekuensi_penarikan,rata_rata_penarikan,tujuan_pembukaan_rekening, status, waktu_kedatangan, alamat_pengambilan FROM data_pembukaan_rekening WHERE nopol = ${nopol}`;

    if (get_by_nik.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Maaf, Data nasabah tidak ditemukan`,
        data: getAll,
      });
    } else {
      const update_status =
        await prisma.$executeRaw`UPDATE data_pembukaan_rekening SET status = ${status},  rencana_tanggal_pengambilan = ${rencana_tanggal_kedatangan}, waktu_kedatangan = ${waktu_kedatangan}, alamat_pengambilan = ${alamat_pengambilan}, tanggal_approve = ${curdate} WHERE nopol = ${nopol}`;

      if (update_status === 0) {
        res.status(501).send({
          status: 501,
          message: `Internal System Error`,
        });
      } else {
        if (status === 1) {
          res.status(200).send({
            status: 200,
            message: `Pengajuan rekening berhasil di Verifikasi`,
          });

          //send WA
          var teks_approve_bank = `Halo *${get_by_nik[0].nama_sesuai_ktp}*, \nData pengajuan pembukaan rekening fuelcard anda untuk kendaraan dengan nopol *${nopol}* sudah diterima, \nSilahkan kunjungi alamat kantor cabang bank di\n\nAlamat : ${alamat_pengambilan}\nTanggal : ${rencana_tanggal_kedatangan}\nPada pukul :${waktu_kedatangan}\n\nMohon datang tepat waktu untuk pengambilan kartu anda.\n\nTerima Kasih`;
          const url = "https://app.whacenter.com/api/send";
          const data = {
            device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
            number: `${get_by_nik[0].nomor_hp}`,
            message: teks_approve_bank,
          };
          const customHeaders = {
            "Content-Type": "application/json",
          };

          fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        } else if (status === 2) {
          res.status(200).send({
            status: 200,
            message: `Pengajuan rekening di Reject dengan alasan ${alasan_reject}`,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

//GET ALL PENGAJUAN FUEL CARD
router.get("/v1/data/pengajuan_fuelcard/", async (req, res, next) => {
  try {
    const getAll = await prisma.$queryRaw`SELECT * FROM data_permohonan`;
    res.status(200).send({
      status: 200,
      message: `Success`,
      data: getAll,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/v1/data/pengajuan_fuelcard/by_pemohon",
  async (req, res, next) => {
    try {
      const { nama_pemohon } = req.body;
      const getby_pemohon =
        await prisma.$queryRaw`SELECT id as id_pendaftaran, nama_pemohon, alamat_ktp, telepon, email, status_permohonan, nomor_polisi, nama_pemilik, merek_kendaraan, alamat_stnk, jenis_kendaraan, model_kendaraan, tahun_pembuatan, isi_silinder, nomor_rangka, nomor_mesin, warna_kendaraan, bahan_bakar, warna_tnkb, tahun_registrasi, nomor_bpkb, masa_berlaku, jumlah_roda, keterangan, foto_depan, foto_samping, foto_stnk, foto_ktp, foto_nib, provinsi, kota, penerbit, foto_surat_pernyataan, foto_bukti_bayar_pbb, nomor_telepon_penanggung_jawab, status_keterangan, tanggal_approve, foto_npwp, nomor_ktp, tanggal_pengajuan, kode_bank FROM data_permohonan WHERE nama_pemohon = ${nama_pemohon}`;
      if (getby_pemohon.length === 0) {
        res.status(404).send({
          status: 404,
          message: `Maaf, Data tidak ditemukan`,
        });
      } else {
        res.status(200).send({
          status: 200,
          message: `Success`,
          data: getby_pemohon,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/v1/data/pengajuan_fuelcard/by_status", async (req, res, next) => {
  try {
    const { status_permohonan } = req.body;
    const getby_status =
      await prisma.$queryRaw`SELECT id as id_pendaftaran, nama_pemohon, alamat_ktp, telepon, email, status_permohonan, nomor_polisi, nama_pemilik, merek_kendaraan, alamat_stnk, jenis_kendaraan, model_kendaraan, tahun_pembuatan, isi_silinder, nomor_rangka, nomor_mesin, warna_kendaraan, bahan_bakar, warna_tnkb, tahun_registrasi, nomor_bpkb, masa_berlaku, jumlah_roda, keterangan, foto_depan, foto_stnk, foto_ktp, foto_nib, provinsi, kota, penerbit, foto_surat_pernyataan, foto_bukti_bayar_pbb, nomor_telepon_penanggung_jawab, status_keterangan, tanggal_approve, foto_npwp, nomor_ktp, tanggal_pengajuan, kode_bank FROM data_permohonan WHERE status_permohonan = ${status_permohonan}`;

    if (getby_status.length == 0) {
      res.status(404).send({
        status: 404,
        message: `Data pengajuan Fuel Card tidak ada`,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: `Success`,
        data: getby_status,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET DATA PENGAJUAN BY NOPOL
router.post("/v1/data/pengajuan_fuelcard/by_id", async (req, res, next) => {
  try {
    const { id } = req.body;

    const getby_id =
      await prisma.$queryRaw // `SELECT id as id_pendaftaran , nama_pemohon, alamat_ktp, telepon, email, status_permohonan, nomor_polisi, nama_pemilik, merek_kendaraan, alamat_stnk, jenis_kendaraan, model_kendaraan, tahun_pembuatan, isi_silinder, nomor_rangka, nomor_mesin, warna_kendaraan, bahan_bakar, warna_tnkb, tahun_registrasi, nomor_bpkb, masa_berlaku, jumlah_roda, keterangan, foto_depan, foto_samping, foto_stnk, foto_ktp, foto_nib, provinsi, kota, penerbit, foto_surat_pernyataan, foto_bukti_bayar_pbb, nomor_telepon_penanggung_jawab, status_keterangan, tanggal_approve, foto_npwp, nomor_ktp, tanggal_pengajuan, kode_bank FROM data_permohonan WHERE id = ${id};`
      `select data_permohonan.id as id_pendaftaran, data_permohonan.nama_pemohon , data_permohonan.alamat_ktp , m_pemohon.provinsi, m_pemohon.kota, m_pemohon.kecamatan, m_pemohon.kelurahan, data_permohonan.telepon , data_permohonan.email , data_permohonan.status_permohonan , data_permohonan.nomor_polisi , data_permohonan.nama_pemilik , data_permohonan.merek_kendaraan , data_permohonan.alamat_stnk , data_permohonan.jenis_kendaraan , data_permohonan.model_kendaraan , data_permohonan.tahun_pembuatan , data_permohonan.isi_silinder , data_permohonan.nomor_rangka , data_permohonan.nomor_mesin , data_permohonan.warna_kendaraan , data_permohonan.bahan_bakar , data_permohonan.bahan_bakar , data_permohonan.warna_tnkb , data_permohonan.tahun_registrasi , data_permohonan.nomor_bpkb , data_permohonan.masa_berlaku , data_permohonan.jumlah_roda , data_permohonan.keterangan , data_permohonan.foto_depan , data_permohonan.foto_samping , data_permohonan.foto_stnk , data_permohonan.foto_ktp , data_permohonan.foto_nib , data_permohonan.penerbit , data_permohonan.foto_surat_pernyataan , data_permohonan.foto_bukti_bayar_pbb , data_permohonan.nomor_telepon_penanggung_jawab , data_permohonan.status_keterangan , data_permohonan.tanggal_approve , data_permohonan.foto_npwp , data_permohonan.nomor_ktp , data_permohonan.tanggal_pengajuan , data_permohonan.kode_bank from data_permohonan inner join m_pemohon on m_pemohon.nomor_ktp = data_permohonan.nomor_ktp where data_permohonan.id = ${id} ;`;

    if (getby_id.length === 1) {
      const get_nop =
        await prisma.$queryRaw`SELECT nop FROM m_pemohon WHERE nama_pemohon = ${getby_id[0].nama_pemohon}`;
      res.status(200).send({
        status: 200,
        message: `Success`,
        data: getby_id,
        Nop: get_nop,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: `Data pengajuan Fuel Card tidak ada`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// VERIFIKASI DATA PENGAJUAN
router.post("/v1/verifikasi/pengajuan_fuelcard/", async (req, res, next) => {
  try {
    const dt = new Date();
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    var curdate = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(
      dt.getDate()
    )} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(
      dt.getSeconds()
    )}`;

    const { nama_pemohon, nomor_polisi, status_permohonan, bank_penerbit } =
      req.body;
    const Querry =
      await prisma.$queryRaw`SELECT id, nama_pemohon, nomor_polisi, nama_pemilik, status_permohonan FROM data_permohonan WHERE nama_pemohon = ${nama_pemohon} AND nomor_polisi = ${nomor_polisi}`;

    if (Querry.length == 0) {
      res.status(404).send({
        status: 404,
        message: `Tidak dapat memproses pengajuan fuel card karena data pengajuan tidak ditemukan`,
      });
    } else if (status_permohonan == 1) {
      const Update_status =
        await prisma.$executeRaw`UPDATE data_permohonan SET status_permohonan = 1, penerbit = ${bank_penerbit}, tanggal_approve = ${curdate}, kode_bank = ${bank_penerbit} WHERE id = ${Querry[0].id}`;

      const succes_update =
        await prisma.$queryRaw`SELECT nama_pemohon, telepon, nama_pemilik, nomor_polisi, nomor_mesin, nomor_rangka , penerbit , status_permohonan FROM data_permohonan WHERE id = ${Querry[0].id}`;

      res.status(200).send({
        status: 200,
        message: `Pengajuan permhonan fuel card atas nama pemohon ${nama_pemohon} dengan Nomor Polisi ${Querry[0].nomor_polisi} berhasil disetujui !`,
        data_pengajuan: succes_update,
      });

      //send WA
      var teks_approve_dinas = `Halo *${nama_pemohon}*, \nSelamat, Pengajuan Fuelcard anda dengan data : \n\nNomor Polisi : ${succes_update[0].nomor_polisi}\nNama Pemilik : ${succes_update[0].nama_pemilik} \n\nSudah kami terima dan diverifikasi. \nMohon untuk menunggu informasi selanjutnya mengenai penerbitan kartu \n\nTerima Kasih`;
      const url = "https://app.whacenter.com/api/send";
      const data = {
        device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
        number: `${succes_update[0].telepon}`,
        message: teks_approve_dinas,
      };
      const customHeaders = {
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else if (status_permohonan == 2) {
      const Update_tidak_valid =
        await prisma.$executeRaw`UPDATE data_permohonan SET status_permohonan = 2 WHERE id = ${Querry[0].id}`;

      const succes_update_2 =
        await prisma.$queryRaw`SELECT nama_pemohon, nama_pemilik, nomor_polisi, nomor_mesin, nomor_rangka , status_permohonan FROM data_permohonan WHERE id = ${Querry[0].id}`;

      res.status(200).send({
        status: 200,
        message: `Permohonan Fuel Card dengan nomor polisi ${nomor_polisi} belum dapat disetujui karena data tidak lengkap / tidak valid. Silahkan lengkapi kembali data permohonan anda`,
        data: succes_update_2,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET HISTORY PEMOHON BY NAMA PEMOHON
router.post("/v1/history/data/pengajuan/by_pemohon", async (req, res, next) => {
  const { nama_pemohon, email } = req.body;
  try {
    const get_by_pemohon =
      await prisma.$queryRaw`SELECT * FROM data_permohonan WHERE email = ${email} AND nama_pemohon = ${nama_pemohon}`;

    if (get_by_pemohon.length == 0) {
      res.status(404).send({
        status: 404,
        message: `History Data permohonan fuel card untuk pemohon dengan nama ${nama_pemohon} tidak ditemukan / belum ada`,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: `Success`,
        data: get_by_pemohon,
      });
    }
  } catch (error) {
    next(error);
  }
});

//ALOKASI FUEL CARD
router.post("/v1/alokasi_bbm", async (req, res, next) => {
  const { nama_pemohon, nomor_polisi, jumlah_alokasi, bank_penerbit } =
    req.body;

  try {
    const check =
      await prisma.$queryRaw`SELECT nomor_polisi, nama_pemohon, jumlah_alokasi FROM alokasi_bbm WHERE nomor_polisi = ${nomor_polisi}`;
    if (check.length == 1) {
      res.status(400).send({
        status: 400,
        message: `Peringatan !. Kendaraan dengan nopol ${check[0].nomor_polisi} sudah diberikan alokasi BBM sejumlah ${check[0].jumlah_alokasi} Liter. tidak dapat menambah / mengurangi alokasi bbm lagi`,
      });
    } else {
      const alokasi =
        await prisma.$executeRaw`INSERT INTO alokasi_bbm (nama_pemohon, nomor_polisi, jumlah_alokasi) VALUES (${nama_pemohon},${nomor_polisi},${jumlah_alokasi})`;

      // const update_bank = await prisma.$executeRaw
      // `UPDATE data_permohonan SET penerbit = ${bank_penerbit}, tanggal_approve = ${current_date} WHERE nomor_polisi = ${nomor_polisi}`

      res.status(200).send({
        status: 200,
        message: `Berhasil memberikan alokasi bbm untuk nopol ${nomor_polisi} sejumlah ${jumlah_alokasi} Liter`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GENERATE SURAT ELEKTRONIK
router.get(
  "/v1/pengajuan/surat_elektronik/:nomor_polisi",
  async (req, res, next) => {
    const nomor_polisi = req.params.nomor_polisi;

    try {
      const get_data =
        await prisma.$queryRaw`SELECT * FROM data_permohonan WHERE nomor_polisi = ${nomor_polisi}`;

      const checker =
        await prisma.$queryRaw`SELECT nomor_polisi,kop_surat FROM surat_elektronik WHERE nomor_polisi = ${nomor_polisi}`;

      if (get_data.length == 0) {
        res.status(404).send({
          status: 404,
          message: `Error. Data pengajuan dengan Nomor Polisi ${nomor_polisi} tidak dapat ditemukan / belum ada`,
        });
      } else if (get_data[0].status_permohonan !== 1) {
        res.status(400).send({
          status: 200,
          message: `Error. Surat Elektronik tidak dapat dibuat karena Pengajuan Fuel Card dengan Nomor Polisi ${nomor_polisi} belum di verifikasi petugas. Terima Kasih`,
        });
      } else if (checker.length == 1) {
        res.status(400).send({
          status: 400,
          message: `Peringatan !. Surat Elektronik untuk Nomor Polisi ${checker[0].nomor_polisi} sudah ada dengan nomor surat ${checker[0].kop_surat}`,
        });
      } else {
        var kop_surat;
        const get_kuota =
          await prisma.$queryRaw`SELECT * FROM alokasi_bbm WHERE nomor_polisi = ${get_data[0].nomor_polisi}`;
        // console.log(get_data[0].nomor_polisi);

        const generate =
          await prisma.$executeRaw`INSERT INTO surat_elektronik (kop_surat, nama_pemohon, nomor_polisi, merk_kendaraan, tipe_kendaraan, kuota_bbm) VALUES 
        ((select COALESCE('FC-'||LPAD((MAX(NULLIF(regexp_replace (kop_surat ,'\\D','','g'), '')::numeric)+1)::text,10,'0'),
        ${kop_surat}) from surat_elektronik), ${get_data[0].nama_pemohon}, ${get_data[0].nomor_polisi}, ${get_data[0].merek_kendaraan}, ${get_data[0].jenis_kendaraan}, ${get_kuota[0].jumlah_alokasi})`;

        res.status(200).send({
          status: 200,
          message: `Berhasil membuat surat elektronik `,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

// GET SURAT ELEKTRONIK BY NOMOR POLISI
router.get(
  "/v1/data/surat_elektronik/:nomor_polisi",
  async (req, res, next) => {
    const nomor_polisi = req.params.nomor_polisi;

    try {
      const querry =
        await prisma.$queryRaw`SELECT * FROM surat_elektronik WHERE nomor_polisi = ${nomor_polisi}`;
      if (querry.length == 1) {
        res.status(200).send({
          status: 200,
          message: `Success !`,
          data: querry[0],
        });
      } else {
        res.status(404).send({
          status: 404,
          message: `Error. Surat Elektronik tidak ditemukan / Belum ada`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//dummy-data-nop
router.get("/v1/dummy/check_nop/:nop", async (req, res, next) => {
  const nop = req.params.nop;

  try {
    const check_nop =
      await prisma.$queryRaw`SELECT * FROM dummy_nop WHERE nop = ${nop}`;
    if (check_nop.length === 1) {
      res.status(200).send({
        status: 200,
        message: `Berhasil mendapatkan informasi NOP`,
        data: check_nop[0],
      });
      if (check_nop[0].status === 0) {
        const teks_nop = `Maaf, Tagihan PBB anda dengan nomor NOP ${check_nop[0].nop} belum lunas \nHarap selesaikan terlebih dahulu tagihan anda untuk melanjutkan pendaftaran fuel card.\n\nTerima Kasih`;
        const url = "https://app.whacenter.com/api/send";
        const data = {
          device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
          number: `${check_nop[0].no_telepon}`,
          message: teks_nop,
        };
        const customHeaders = {
          "Content-Type": "application/json",
        };

        fetch(url, {
          method: "POST",
          headers: customHeaders,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    } else {
      res.status(404).send({
        status: 404,
        message: `Nomor NOP tidak ditemukan atau tidak valid. Pastikan anda memasukan NOP yang benar`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//BANK-GET-DATA_PERMOHONAN
router.post("/v1/bank/get_approved/by_pemohon/", async (req, res, next) => {
  const { nama_pemohon, nomor_polisi } = req.body;

  try {
    const getdata =
      await prisma.$queryRaw`select m_pemohon.nama_pemohon , m_pemohon.alamat , m_pemohon.nomor_ktp , m_pemohon.ibu_kandung , data_permohonan.nomor_polisi , alokasi_bbm.jumlah_alokasi from m_pemohon inner join data_permohonan on m_pemohon.nama_pemohon = data_permohonan.nama_pemohon inner join alokasi_bbm on alokasi_bbm.nomor_polisi  = data_permohonan.nomor_polisi and alokasi_bbm.nomor_polisi = ${nomor_polisi} and m_pemohon.nama_pemohon = ${nama_pemohon};`;
    if (getdata.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Data tidak ditemukan`,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: `Berhasil mengambil data`,
        data: getdata[0],
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/v1/bank/get_all_approved/pemohon", async (req, res, next) => {
  try {
    const getdata =
      await prisma.$queryRaw // `select m_pemohon.nama_pemohon , m_pemohon.status_permohonan as jenis_permohonan, m_pemohon.alamat , m_pemohon.nomor_ktp , m_pemohon.nomor_ktp as nik, m_pemohon.ibu_kandung , data_permohonan.nomor_polisi , data_permohonan.status_permohonan , data_permohonan.penerbit, alokasi_bbm.jumlah_alokasi from m_pemohon inner join data_permohonan on m_pemohon.nama_pemohon = data_permohonan.nama_pemohon inner join alokasi_bbm on alokasi_bbm.nomor_polisi  = data_permohonan.nomor_polisi and data_permohonan.status_permohonan = 1;`
      `select m_pemohon.nama_pemohon , m_pemohon.status_permohonan as jenis_permohonan, m_pemohon.alamat , m_pemohon.nomor_ktp , m_pemohon.nomor_ktp as nik, data_pembukaan_rekening.nama_ibu_kandung as ibu_kandung, data_permohonan.nomor_polisi , data_permohonan.status_permohonan , data_permohonan.penerbit, alokasi_bbm.jumlah_alokasi , data_pembukaan_rekening.status as status_pembukaan_rekening, data_permohonan.kode_bank from m_pemohon inner join data_permohonan on m_pemohon.nama_pemohon = data_permohonan.nama_pemohon inner join alokasi_bbm on alokasi_bbm.nomor_polisi  = data_permohonan.nomor_polisi inner join data_pembukaan_rekening on data_pembukaan_rekening.nopol = data_permohonan.nomor_polisi and data_permohonan.status_permohonan = 1;`;

    if (getdata.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Data tidak ditemukan`,
        data: getdata,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: `Berhasil mengambil data`,
        data: getdata,
      });
    }
  } catch (error) {
    next(error);
  }
});

//get_all_data_approved_by_bank
router.get(
  "/v1/bank/get_all_approved/approved_bank/",
  async (req, res, next) => {
    try {
      const getdata =
        await prisma.$queryRaw`select m_pemohon.nama_pemohon , m_pemohon.status_permohonan as jenis_permohonan, m_pemohon.alamat , m_pemohon.nomor_ktp , m_pemohon.nomor_ktp as nik, data_pembukaan_rekening.nama_ibu_kandung as ibu_kandung, data_permohonan.nomor_polisi , data_permohonan.status_permohonan , data_permohonan.penerbit, alokasi_bbm.jumlah_alokasi , data_pembukaan_rekening.status as status_pembukaan_rekening, data_permohonan.kode_bank, data_pembukaan_rekening.tanggal_approve as tanggal_approval_bank, data_pembukaan_rekening.tanggal_terbit as tanggal_kartu_terbit from m_pemohon inner join data_permohonan on m_pemohon.nama_pemohon = data_permohonan.nama_pemohon inner join alokasi_bbm on alokasi_bbm.nomor_polisi  = data_permohonan.nomor_polisi inner join data_pembukaan_rekening on data_pembukaan_rekening.nopol = data_permohonan.nomor_polisi where data_pembukaan_rekening.status = 1;`;

      if (getdata.length === 0) {
        res.status(404).send({
          status: 404,
          message: `Data tidak ditemukan`,
          data: getdata,
        });
      } else {
        res.status(200).send({
          status: 200,
          message: `Berhasil mengambil data yang sudah di approve oleh bank`,
          data: getdata,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//input kartu & nomor rekening by nopol
router.post("/v1/bank/data_approved/input_card/", async (req, res, next) => {
  const { nomor_kartu, nomor_rekening, nomor_polisi } = req.body;

  const dt = new Date();
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
  var curdate = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(
    dt.getDate()
  )} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`;

  try {
    const getdata =
      await prisma.$queryRaw`select m_pemohon.nama_pemohon , m_pemohon.status_permohonan as jenis_permohonan, m_pemohon.alamat , m_pemohon.nomor_ktp , m_pemohon.nomor_ktp as nik, data_pembukaan_rekening.nama_ibu_kandung as ibu_kandung, data_permohonan.nomor_polisi , data_permohonan.status_permohonan , data_permohonan.penerbit, alokasi_bbm.jumlah_alokasi , data_pembukaan_rekening.status as status_pembukaan_rekening, data_permohonan.kode_bank, data_pembukaan_rekening.tanggal_approve as tanggal_approval_bank, data_pembukaan_rekening.tanggal_terbit as tanggal_kartu_terbit from m_pemohon inner join data_permohonan on m_pemohon.nama_pemohon = data_permohonan.nama_pemohon inner join alokasi_bbm on alokasi_bbm.nomor_polisi  = data_permohonan.nomor_polisi inner join data_pembukaan_rekening on data_pembukaan_rekening.nopol = data_permohonan.nomor_polisi where data_pembukaan_rekening.status = 1;`;

    if (getdata.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Data tidak ditemukan`,
      });
    } else {
      const update_status =
        await prisma.$executeRaw`UPDATE data_pembukaan_rekening SET tanggal_terbit = ${curdate}, status_terbit = 1 WHERE nopol = ${nomor_polisi};`;

      const insert_nomor_kartu =
        await prisma.$executeRaw`UPDATE alokasi_bbm SET nomor_kartu = ${nomor_kartu}, nomor_rekening = ${nomor_rekening} , status_pembuatan_rekening = 1 , tgl_pembuatan_rekening = ${curdate} WHERE nomor_polisi = ${nomor_polisi};`;

      res.status(200).send({
        status: 200,
        message: `Data Berhasil di input`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//by_kode_bank/penerbit
router.get(
  "/v1/bank/get_all_approved/pemohon/by_bank/:kode_bank",
  async (req, res, next) => {
    const kode_bank = req.params.kode_bank;
    try {
      const getdata =
        await prisma.$queryRaw`select m_pemohon.nama_pemohon , m_pemohon.status_permohonan as jenis_permohonan, m_pemohon.alamat , m_pemohon.nomor_ktp , m_pemohon.nomor_ktp as nik, data_pembukaan_rekening.nama_ibu_kandung as ibu_kandung, data_permohonan.nomor_polisi , data_permohonan.status_permohonan , data_permohonan.penerbit, alokasi_bbm.jumlah_alokasi , data_pembukaan_rekening.status as status_pembukaan_rekening, data_permohonan.kode_bank from m_pemohon inner join data_permohonan on m_pemohon.nama_pemohon = data_permohonan.nama_pemohon inner join alokasi_bbm on alokasi_bbm.nomor_polisi  = data_permohonan.nomor_polisi inner join data_pembukaan_rekening on data_pembukaan_rekening.nopol = data_permohonan.nomor_polisi where data_permohonan.penerbit = ${kode_bank} or data_permohonan.kode_bank = ${kode_bank} and data_permohonan.status_permohonan = 1;`;

      if (getdata.length === 0) {
        res.status(404).send({
          status: 404,
          message: `Data tidak ditemukan`,
          data: getdata,
        });
      } else {
        res.status(200).send({
          status: 200,
          message: `Berhasil mengambil data`,
          data: getdata,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/v1/bank/register/", async (req, res, next) => {
  const { nama, no_telepon, email, password, otorisasi, kode_bank } = req.body;
  try {
    const query =
      await prisma.$queryRaw`SELECT nama, no_telepon FROM m_user_bank WHERE nama = ${nama} OR no_telepon = ${no_telepon}`;

    if (query.length === 1) {
      res.status(403).send({
        status: 403,
        message: `Nama atau Nomor telepon sudah terdaftar !`,
      });
    } else {
      const hash = bcrypt.hashSync(password, salt);
      const register =
        await prisma.$executeRaw`INSERT into m_user_bank (nama, no_telepon, email, password, role, otorisasi, kode_bank ) VALUES (${nama}, ${no_telepon}, ${email}, ${hash}, 'bank', ${otorisasi}, ${kode_bank} )`;

      res.status(200).send({
        status: 200,
        message: `Registrasi Berhasil`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//BACK LEVEL /  REJECT
router.post("/v1/verifikasi/pengajuan/reject", async (req, res, next) => {
  const { nomor_polisi, alasan_reject } = req.body;

  try {
    const get_number =
      await prisma.$queryRaw`SELECT nama_pemohon, telepon FROM data_permohonan WHERE nomor_polisi = ${nomor_polisi} `;

    const back_level =
      await prisma.$executeRaw`UPDATE data_permohonan SET status_permohonan = 2, status_keterangan = ${alasan_reject} WHERE nomor_polisi = ${nomor_polisi}`;

    if (back_level == 1) {
      res.status(200).send({
        status: 200,
        message: `Berhasil`,
      });

      var teks_back_level = `Kepada Yth.\nBapak/Ibu *${get_number[0].nama_pemohon}*, \nPengajuan Fuelcard anda dengan Nomor Polisi *${nomor_polisi}* ditunda dengan alasan *${alasan_reject}*, \nSilahkan lengkapi kembali data pengajuan anda. \n\nTerima Kasih`;
      //send message
      const url = "https://app.whacenter.com/api/send";
      const data = {
        device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
        number: `${get_number[0].telepon}`,
        message: teks_back_level,
      };
      const customHeaders = {
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      res.status(501).send({
        status: 501,
        message: `Internal System Error`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//MELENGKAPI DATA
router.post("/v1/update/pengajuan/", async (req, res, next) => {
  const {
    nomor_polisi,
    nama_pemilik,
    merek_kendaraan,
    alamat_stnk,
    jenis_kendaraan,
    model_kendaraan,
    tahun_pembuatan,
    isi_silinder,
    nomor_rangka,
    nomor_mesin,
    warna_kendaraan,
    bahan_bakar,
    warna_tnkb,
    tahun_registrasi,
    nomor_bpkb,
    masa_berlaku,
    jumlah_roda,
    foto_depan,
    foto_samping,
    foto_stnk,
    foto_ktp,
    foto_bukti_bayar_pbb,
    foto_npwp,
    foto_nib,
  } = req.body;

  try {
    const update =
      await prisma.$executeRaw`UPDATE data_permohonan SET status_permohonan = 0, nomor_polisi = ${nomor_polisi}, nama_pemilik = ${nama_pemilik}, merek_kendaraan = ${merek_kendaraan}, alamat_stnk = ${alamat_stnk}, jenis_kendaraan = ${jenis_kendaraan}, model_kendaraan = ${model_kendaraan}, tahun_pembuatan = ${tahun_pembuatan}, 
    isi_silinder = ${isi_silinder}, nomor_rangka = ${nomor_rangka}, nomor_mesin = ${nomor_mesin}, warna_kendaraan = ${warna_kendaraan}, bahan_bakar = ${bahan_bakar}, warna_tnkb = ${warna_tnkb}, tahun_registrasi = ${tahun_registrasi}, nomor_bpkb = ${nomor_bpkb},
    masa_berlaku = ${masa_berlaku}, jumlah_roda = ${jumlah_roda}, foto_depan = ${foto_depan}, foto_samping = ${foto_samping}, foto_stnk = ${foto_stnk}, foto_ktp = ${foto_ktp}, foto_bukti_bayar_pbb = ${foto_bukti_bayar_pbb}, foto_npwp = ${foto_npwp}, foto_nib = ${foto_nib} WHERE nomor_polisi = ${nomor_polisi}`;
    if (update === 1) {
      res.status(200).send({
        status: 200,
        message: `Berhasil update data kendaraan !`,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: "Internal System Error",
      });
    }
  } catch (error) {
    next(error);
  }
});

//Setting Running Text
router.post("/v1/setting/running_text/create", async (req, res, next) => {
  const { isi_text } = req.body;

  try {
    const create =
      await prisma.$executeRaw`INSERT INTO running_text ( isi_text ) VALUES ( ${isi_text} );`;

    res.status(200).send({
      status: 200,
      message: `Berhasil`,
    });
  } catch (error) {
    next(error);
  }
});

//Get data running Text
router.get("/v1/setting/running_text/get", async (req, res, next) => {
  try {
    const get = await prisma.$queryRaw`SELECT isi_text FROM running_text`;

    // var data = [];

    // get.forEach(element => {
    //   var a = {};
    //   a.id = Number(element.id);
    //   a.isi_text = element.isi_text;

    //   data.push(a)
    // });

    res.status(200).send({
      status: 200,
      message: `Berhasil`,
      data: get[0].isi_text,
    });
  } catch (error) {
    next(error);
  }
});

//Get data running Text by id
router.get("/v1/setting/running_text/get_by/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const get =
      await prisma.$queryRaw`SELECT isi_text FROM running_text WHERE id = ${id}`;

    if (get.length === 0) {
      res.status(404).send({
        status: 404,
        message: "Data Running text tidak ditemukan !",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: `Berhasil`,
        data: get,
      });
    }
  } catch (error) {
    next(error);
  }
});

//Edit Running Text
router.post("/v1/setting/running_text/edit", async (req, res, next) => {
  const { isi_text } = req.body;

  try {
    const get = await prisma.$queryRaw`SELECT isi_text FROM running_text`;
    if (get.length === 1) {
      const edit =
        await prisma.$executeRaw`UPDATE running_text SET isi_text = ${isi_text}`;
      if (edit === 1) {
        res.status(200).send({
          status: 200,
          message: `Berhasil merubah isi text !`,
        });
      } else {
        res.status(500).send({
          status: 500,
          message: `Internal System Error !`,
        });
      }
    } else {
      res.status(404).send({
        status: 400,
        message: `Data tidak ditemukan `,
      });
    }
  } catch (error) {
    next(error);
  }
});

//Create Berita
router.post("/v1/setting/berita/create", async (req, res, next) => {
  const { judul, gambar, isi } = req.body;
  try {
    const create =
      await prisma.$executeRaw`INSERT INTO berita (judul, gambar, isi) VALUES (${judul}, ${gambar}, ${isi});`;

    res.status(200).send({
      status: 200,
      message: "Berhasil menambahkan berita baru",
    });
  } catch (error) {
    next(error);
  }
});

//Get Berita
router.get("/v1/setting/berita/get", async (req, res, next) => {
  try {
    const get =
      await prisma.$queryRaw`SELECT id_berita, judul, gambar, tanggal_publish, isi FROM berita`;
    var data = [];

    get.forEach((element) => {
      var a = {};
      a.id = Number(element.id_berita);
      a.judul = element.judul;
      a.gambar = element.gambar;
      a.tanggal_publish = element.tanggal_publish;
      a.isi = element.isi;

      data.push(a);
    });

    res.status(200).send({
      status: 200,
      message: "Berhasil",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

//Get Berita by id
router.get("/v1/setting/berita/get_by/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const get =
      await prisma.$queryRaw`SELECT judul, gambar, tanggal_publish, isi FROM berita WHERE id_berita = ${id}`;

    if (get.length === 0) {
      res.status(404).send({
        status: 404,
        message: "Berita tidak ditemukan !",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "Berhasil",
        data: get[0],
      });
    }
  } catch (error) {
    next(error);
  }
});

//Edit Berita by id
router.post("/v1/setting/berita/edit", async (req, res, next) => {
  3;
  const { id_berita, judul, gambar, isi } = req.body;
  try {
    const get =
      await prisma.$queryRaw`SELECT id_berita FROM berita WHERE id_berita = ${id_berita}`;

    if (get.length === 1) {
      const update =
        await prisma.$executeRaw`UPDATE berita SET judul =${judul}, gambar = ${gambar}, isi = ${isi} WHERE id_berita = ${id_berita}`;

      res.status(200).send({
        status: 200,
        message: "Berhasil Merubah Berita !",
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Terjadi Kesalahan !. Data berita tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
});

//Hapus Berita
router.post("/v1/setting/berita/delete", async (req, res, next) => {
  const { id_berita } = req.body;
  try {
    const get =
      await prisma.$queryRaw`SELECT id_berita , judul FROM berita WHERE id_berita = ${id_berita}`;
    if (get.length === 1) {
      const hapus =
        await prisma.$executeRaw`DELETE FROM berita WHERE id_berita = ${id_berita}`;

      res.status(200).send({
        status: 200,
        message: `Berhasil Menghapus Berita dengan nama ${get[0].judul}`,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: `Terjadi Kesalahan !. Data berita tidak ditemukan `,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET DATA UNTUK BANK BY NOPOL
router.post(
  "/v1/data/calon_nasabah/approved_by_dinas/by_nopol",
  async (req, res, next) => {
    const { nomor_polisi } = req.body;
    try {
      const get_data =
        await prisma.$queryRaw // `select data_permohonan.id as id_pendaftaran, data_permohonan.nomor_polisi, alokasi_bbm.jumlah_alokasi, data_pembukaan_rekening.kode_bank, data_pembukaan_rekening.nama_sesuai_ktp, data_pembukaan_rekening.nama_ibu_kandung, data_pembukaan_rekening.jenis_kelamin, data_pembukaan_rekening.tempat_lahir, data_pembukaan_rekening.tanggal_lahir, data_pembukaan_rekening.alamat, data_pembukaan_rekening.status_alamat, data_pembukaan_rekening.provinsi, data_pembukaan_rekening.kota, data_pembukaan_rekening.kecamatan, data_pembukaan_rekening.kelurahan, data_pembukaan_rekening.kode_pos, data_pembukaan_rekening.npwp, data_pembukaan_rekening.nomor_hp, data_pembukaan_rekening.email, data_pembukaan_rekening.agama, data_pembukaan_rekening.status_kawin, data_pembukaan_rekening.pendidikan_akhir, data_pembukaan_rekening.pekerjaan, data_pembukaan_rekening.tanggal_mulai_kerja, data_pembukaan_rekening.nomor_induk_pegawai, data_pembukaan_rekening.bidang_usaha, data_pembukaan_rekening.jabatan, data_pembukaan_rekening.nama_perusahaan, data_pembukaan_rekening.lokasi_usaha, data_pembukaan_rekening.provinsi_usaha, data_pembukaan_rekening.kota_kerja, data_pembukaan_rekening.penghasilan_perbulan, data_pembukaan_rekening.sumber_penghasilan, data_pembukaan_rekening.penghasilan_tambahan, data_pembukaan_rekening.frekuensi_setoran, data_pembukaan_rekening.rata_rata_setoran, data_pembukaan_rekening.frekuensi_penarikan, data_pembukaan_rekening.rata_rata_penarikan, data_pembukaan_rekening.tujuan_pembukaan_rekening from data_pembukaan_rekening inner join data_permohonan on data_pembukaan_rekening.nik = data_permohonan.nomor_ktp inner join alokasi_bbm on alokasi_bbm.nomor_polisi = data_permohonan.nomor_polisi;`
        `select data_permohonan.id as id_pendaftaran, data_pembukaan_rekening.nama_sesuai_ktp, data_pembukaan_rekening.nopol, alokasi_bbm.jumlah_alokasi, data_permohonan.penerbit as kode_bank, data_pembukaan_rekening.nama_ibu_kandung, data_pembukaan_rekening.jenis_kelamin, data_pembukaan_rekening.tempat_lahir, data_pembukaan_rekening.tanggal_lahir, data_pembukaan_rekening.alamat, data_pembukaan_rekening.status_alamat, data_pembukaan_rekening.provinsi, data_pembukaan_rekening.kota, data_pembukaan_rekening.kecamatan, data_pembukaan_rekening.kelurahan, data_pembukaan_rekening.kode_pos, data_pembukaan_rekening.npwp, data_pembukaan_rekening.nomor_hp, data_pembukaan_rekening.email, data_pembukaan_rekening.agama, data_pembukaan_rekening.status_kawin, data_pembukaan_rekening.pendidikan_akhir, data_pembukaan_rekening.pekerjaan, data_pembukaan_rekening.tanggal_mulai_kerja, data_pembukaan_rekening.nomor_induk_pegawai, data_pembukaan_rekening.bidang_usaha, data_pembukaan_rekening.jabatan, data_pembukaan_rekening.nama_perusahaan, data_pembukaan_rekening.lokasi_usaha, data_pembukaan_rekening.provinsi_usaha, data_pembukaan_rekening.kota_kerja, data_pembukaan_rekening.penghasilan_perbulan, data_pembukaan_rekening.sumber_penghasilan, data_pembukaan_rekening.penghasilan_tambahan, data_pembukaan_rekening.frekuensi_setoran, data_pembukaan_rekening.rata_rata_setoran, data_pembukaan_rekening.frekuensi_penarikan, data_pembukaan_rekening.rata_rata_penarikan, data_pembukaan_rekening.tujuan_pembukaan_rekening, data_permohonan.status_permohonan as status_permohonan_fuelcard, data_pembukaan_rekening.status as status_pembukaan_rekening, data_pembukaan_rekening.rencana_tanggal_pengambilan, data_pembukaan_rekening.waktu_kedatangan, data_pembukaan_rekening.alamat_pengambilan , data_permohonan.foto_ktp , data_permohonan.foto_samping as foto_selfie_ktp from data_pembukaan_rekening inner join data_permohonan on data_pembukaan_rekening.nopol = data_permohonan.nomor_polisi inner join alokasi_bbm on alokasi_bbm.nomor_polisi = data_pembukaan_rekening.nopol where data_pembukaan_rekening.nopol = ${nomor_polisi};`;
      if (get_data.length === 1) {
        res.status(200).send({
          status: 200,
          message: `Success`,
          data: get_data,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: `Maaf, data tidak ditemukan`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//GET DATA UNTUK BANK BY PEMOHON
router.post(
  "/v1/data/calon_nasabah/approved/dinas/bank/by_pemohon",
  async (req, res, next) => {
    const { nama_pemohon, no_telepon } = req.body;
    try {
      const get_data =
        await prisma.$queryRaw`select data_permohonan.id as id_pendaftaran, data_pembukaan_rekening.nama_sesuai_ktp, data_pembukaan_rekening.nopol, alokasi_bbm.jumlah_alokasi, data_permohonan.penerbit as kode_bank, data_pembukaan_rekening.nama_ibu_kandung, data_pembukaan_rekening.jenis_kelamin, data_pembukaan_rekening.tempat_lahir, data_pembukaan_rekening.tanggal_lahir, data_pembukaan_rekening.alamat, data_pembukaan_rekening.status_alamat, data_pembukaan_rekening.provinsi, data_pembukaan_rekening.kota, data_pembukaan_rekening.kecamatan, data_pembukaan_rekening.kelurahan, data_pembukaan_rekening.kode_pos, data_pembukaan_rekening.npwp, data_pembukaan_rekening.nomor_hp, data_pembukaan_rekening.email, data_pembukaan_rekening.agama, data_pembukaan_rekening.status_kawin, data_pembukaan_rekening.pendidikan_akhir, data_pembukaan_rekening.pekerjaan, data_pembukaan_rekening.tanggal_mulai_kerja, data_pembukaan_rekening.nomor_induk_pegawai, data_pembukaan_rekening.bidang_usaha, data_pembukaan_rekening.jabatan, data_pembukaan_rekening.nama_perusahaan, data_pembukaan_rekening.lokasi_usaha, data_pembukaan_rekening.provinsi_usaha, data_pembukaan_rekening.kota_kerja, data_pembukaan_rekening.penghasilan_perbulan, data_pembukaan_rekening.sumber_penghasilan, data_pembukaan_rekening.penghasilan_tambahan, data_pembukaan_rekening.frekuensi_setoran, data_pembukaan_rekening.rata_rata_setoran, data_pembukaan_rekening.frekuensi_penarikan, data_pembukaan_rekening.rata_rata_penarikan, data_pembukaan_rekening.tujuan_pembukaan_rekening, data_permohonan.status_permohonan as status_permohonan_fuelcard, data_pembukaan_rekening.status as status_pembukaan_rekening, data_pembukaan_rekening.rencana_tanggal_pengambilan, data_pembukaan_rekening.waktu_kedatangan, data_pembukaan_rekening.alamat_pengambilan , data_permohonan.foto_ktp , data_permohonan.foto_samping as foto_selfie_ktp from data_pembukaan_rekening inner join data_permohonan on data_pembukaan_rekening.nopol = data_permohonan.nomor_polisi inner join alokasi_bbm on alokasi_bbm.nomor_polisi = data_pembukaan_rekening.nopol where data_permohonan.nama_pemohon = ${nama_pemohon} AND data_permohonan.telepon = ${no_telepon};`;
      if (get_data.length === 0) {
        res.status(404).send({
          status: 404,
          message: `Maaf, data tidak ditemukan`,
        });
      } else {
        res.status(200).send({
          status: 200,
          message: `Success`,
          data: get_data,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//Update data bank
router.post(
  "/v1/update/data/calon_nasabah/approved/dinas/bank/nomor_polisi",
  async (req, res, next) => {
    const {
      nomor_polisi,
      nik,
      nama_sesuai_ktp,
      nama_ibu_kandung,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      status_alamat,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      kode_pos,
      npwp,
      nomor_hp,
      email,
      agama,
      status_kawin,
      pendidikan_akhir,
      pekerjaan,
      tanggal_mulai_kerja,
      nomor_induk_pegawai,
      bidang_usaha,
      jabatan,
      nama_perusahaan,
      lokasi_usaha,
      provinsi_usaha,
      kota_kerja,
      penghasilan_perbulan,
      sumber_penghasilan,
      penghasilan_tambahan,
      frekuensi_setoran,
      rata_rata_setoran,
      frekuensi_penarikan,
      rata_rata_penarikan,
      tujuan_pembukaan_rekening,
    } = req.body;
    try {
      const get_data =
        await prisma.$queryRaw`select nopol from data_pembukaan_rekening where nopol = ${nomor_polisi}`;
      if (get_data.length === 0) {
        res.status(404).send({
          status: 404,
          message: `Maaf, data tidak ditemukan`,
        });
      } else {
        //update data
        const update_data_bank =
          await prisma.$executeRaw`UPDATE data_pembukaan_rekening SET status = 0,  nik = ${nik},  nama_sesuai_ktp = ${nama_sesuai_ktp},  nama_ibu_kandung = ${nama_ibu_kandung},  jenis_kelamin = ${jenis_kelamin},  tempat_lahir = ${tempat_lahir},  tanggal_lahir = ${tanggal_lahir},  alamat = ${alamat},  status_alamat = ${status_alamat},  provinsi = ${provinsi},  kota = ${kota},  kecamatan = ${kecamatan},  kelurahan = ${kelurahan},  kode_pos = ${kode_pos},  npwp = ${npwp},  nomor_hp = ${nomor_hp},  email = ${email},  agama = ${agama},  status_kawin = ${status_kawin},  pendidikan_akhir = ${pendidikan_akhir},  pekerjaan = ${pekerjaan},  tanggal_mulai_kerja = ${tanggal_mulai_kerja},  nomor_induk_pegawai = ${nomor_induk_pegawai},  bidang_usaha = ${bidang_usaha},  jabatan = ${jabatan},  nama_perusahaan = ${nama_perusahaan},  lokasi_usaha = ${lokasi_usaha},  provinsi_usaha = ${provinsi_usaha},  kota_kerja = ${kota_kerja},  penghasilan_perbulan = ${penghasilan_perbulan},  sumber_penghasilan = ${sumber_penghasilan},  penghasilan_tambahan = ${penghasilan_tambahan},  frekuensi_setoran = ${frekuensi_setoran},  rata_rata_setoran = ${rata_rata_setoran},  frekuensi_penarikan = ${frekuensi_penarikan},  rata_rata_penarikan = ${rata_rata_penarikan}, tujuan_pembukaan_rekening = ${tujuan_pembukaan_rekening} WHERE nopol = ${nomor_polisi};`;

        res.status(200).send({
          status: 200,
          message: `Berhasil update data pembukaan rekening`,
        });
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
);

//GET DATA UNTUK BANK
router.get(
  "/v1/data/calon_nasabah/approved_by_dinas/",
  async (req, res, next) => {
    try {
      const get_data =
        await prisma.$queryRaw`select data_permohonan.id as id_pendaftaran, data_permohonan.nomor_polisi, alokasi_bbm.jumlah_alokasi, data_pembukaan_rekening.kode_bank, data_pembukaan_rekening.nama_sesuai_ktp, data_pembukaan_rekening.nama_ibu_kandung, data_pembukaan_rekening.jenis_kelamin, data_pembukaan_rekening.tempat_lahir, data_pembukaan_rekening.tanggal_lahir, data_pembukaan_rekening.alamat, data_pembukaan_rekening.status_alamat, data_pembukaan_rekening.provinsi, data_pembukaan_rekening.kota, data_pembukaan_rekening.kecamatan, data_pembukaan_rekening.kelurahan, data_pembukaan_rekening.kode_pos, data_pembukaan_rekening.npwp, data_pembukaan_rekening.nomor_hp, data_pembukaan_rekening.email, data_pembukaan_rekening.agama, data_pembukaan_rekening.status_kawin, data_pembukaan_rekening.pendidikan_akhir, data_pembukaan_rekening.pekerjaan, data_pembukaan_rekening.tanggal_mulai_kerja, data_pembukaan_rekening.nomor_induk_pegawai, data_pembukaan_rekening.bidang_usaha, data_pembukaan_rekening.jabatan, data_pembukaan_rekening.nama_perusahaan, data_pembukaan_rekening.lokasi_usaha, data_pembukaan_rekening.provinsi_usaha, data_pembukaan_rekening.kota_kerja, data_pembukaan_rekening.penghasilan_perbulan, data_pembukaan_rekening.sumber_penghasilan, data_pembukaan_rekening.penghasilan_tambahan, data_pembukaan_rekening.frekuensi_setoran, data_pembukaan_rekening.rata_rata_setoran, data_pembukaan_rekening.frekuensi_penarikan, data_pembukaan_rekening.rata_rata_penarikan, data_pembukaan_rekening.tujuan_pembukaan_rekening from data_pembukaan_rekening inner join data_permohonan on data_pembukaan_rekening.nik = data_permohonan.nomor_ktp inner join alokasi_bbm on alokasi_bbm.nomor_polisi = data_permohonan.nomor_polisi;`;

      if (get_data.length === 0) {
        res.status(404).send({
          status: 404,
          message: `Maaf, data tidak ditemukan`,
        });
      } else {
        res.status(200).send({
          status: 200,
          message: `Success`,
          data: get_data,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//PROVINSI
router.post("/v1/data/provinsi/", async (req, res, next) => {
  const { nama } = req.body;
  try {
    const insert =
      await prisma.$executeRaw`INSERT INTO provinsi (nama_provinsi) VALUES (${nama});`;

    res.status(200).send({
      status: 200,
      message: `Berhasil menambahkan data !`,
    });
  } catch (error) {
    next(error);
  }
});

//KOTA KABUPATEN
router.post("/v1/data/provinsi/kota/", async (req, res, next) => {
  const { provinsi_id, nama } = req.body;
  try {
    const insert =
      await prisma.$executeRaw`INSERT INTO kota_kabupaten (provinsi_id, nama) VALUES ( ${provinsi_id}, ${nama} )`;

    res.status(200).send({
      status: 200,
      message: `Success !`,
    });
  } catch (error) {
    next(error);
  }
});

//KECAMATAN
router.post("/v1/data/provinsi/kecamatan/", async (req, res, next) => {
  const { regensi_id, nama } = req.body;
  try {
    const insert =
      await prisma.$executeRaw`INSERT INTO kecamatan (regensi_id, nama) VALUES ( ${regensi_id}, ${nama} )`;

    res.status(200).send({
      status: 200,
      message: `Success !`,
    });
  } catch (error) {
    next(error);
  }
});

//KELURAHAN
router.post("/v1/data/provinsi/kelurahan/", async (req, res, next) => {
  const { distrik_id, nama_kelurahan, id_kelurahan } = req.body;
  try {
    const insert =
      await prisma.$executeRaw`INSERT INTO kelurahan (distrik_id, nama_kelurahan, id_kelurahan) VALUES ( ${distrik_id}, ${nama_kelurahan}, ${id_kelurahan} )`;

    res.status(200).send({
      status: 200,
      message: `Success !`,
    });
  } catch (error) {
    next(error);
  }
});

//get all provinsi
router.get("/v1/data/provinsi/", async (req, res, next) => {
  try {
    const querry =
      await prisma.$queryRaw`SELECT id, id_provinsi, nama_provinsi FROM provinsi;`;

    res.status(200).send({
      status: 200,
      message: `Success`,
      data: querry,
    });
  } catch (error) {
    next(error);
  }
});

//get all kota kabupaten
router.get("/v1/data/provinsi/kota/:id_provinsi", async (req, res, next) => {
  const id_provinsi = req.params.id_provinsi;
  try {
    const querry =
      await prisma.$queryRaw`SELECT provinsi_id, nama, id_kkb FROM kota_kabupaten WHERE provinsi_id = ${id_provinsi} ORDER BY id_kkb ASC;`;

    const nama_provinsi =
      await prisma.$queryRaw`SELECT nama_provinsi FROM provinsi WHERE id_provinsi = ${id_provinsi};`;

    if (querry.length == 0) {
      res.status(404).send({
        status: 404,
        message: `data tidak ditemukan`,
      });
    } else {
      const nama_provinsi =
        await prisma.$queryRaw`SELECT nama_provinsi FROM provinsi WHERE id_provinsi = ${id_provinsi};`;

      res.status(200).send({
        status: 200,
        message: `Berikut Kota/Kabupaten dibawah provinsi ${nama_provinsi[0].nama_provinsi}`,
        data: querry,
      });
    }
  } catch (error) {
    next(error);
  }
});

//get all kecamatan
router.get(
  "/v1/data/provinsi/kota/kecamatan/:regensi_id",
  async (req, res, next) => {
    const regensi_id = req.params.regensi_id;
    try {
      const querry =
        await prisma.$queryRaw`SELECT regensi_id, nama, id_kecamatan FROM kecamatan WHERE regensi_id = ${regensi_id} ORDER BY id_kecamatan ASC;`;

      if (querry.length == 0) {
        res.status(404).send({
          status: 404,
          message: `data tidak ditemukan`,
        });
      } else {
        const nama_kota =
          await prisma.$queryRaw`SELECT nama FROM kota_kabupaten WHERE id_kkb = ${regensi_id}`;

        res.status(200).send({
          status: 200,
          message: `Berikut Kecamatan dibawah ${nama_kota[0].nama}`,
          data: querry,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//get all kelurahan
router.get(
  "/v1/data/provinsi/kota/kecamatan/kelurahan/:distrik_id",
  async (req, res, next) => {
    const distrik_id = req.params.distrik_id;
    try {
      const querry =
        await prisma.$queryRaw`SELECT nama_kelurahan, distrik_id, id_kelurahan FROM kelurahan WHERE distrik_id = ${distrik_id} ORDER BY id_kelurahan ASC ;`;

      if (querry.length == 0) {
        res.status(404).send({
          status: 404,
          message: `data tidak ditemukan`,
        });
      } else {
        const nama_kecamatan =
          await prisma.$queryRaw`SELECT nama FROM kecamatan WHERE id_kecamatan = ${distrik_id}`;

        res.status(200).send({
          status: 200,
          message: `Kelurahan/Desa dibawah Kecamatan ${nama_kecamatan[0].nama}`,
          data: querry,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//data dashboard
router.get("/v1/data/dashboard/", async (req, res, next) => {
  try {
    //count total pemohon
    const total_pemohon =
      await prisma.$queryRaw`SELECT count(*) as total_pemohon from m_pemohon`;

    //count jumlah mobil
    const total_kendaraan =
      await prisma.$queryRaw`select count(*) as total_kendaraan from data_permohonan`;

    //total pengajuan sukses
    const pengajuan_sukses =
      await prisma.$queryRaw`select count(*) as total_pengajuan_sukses from data_permohonan where status_permohonan = 1;`;

    //total pengajuan gagal
    const pengajuan_gagal =
      await prisma.$queryRaw`select count(*) as total_pengajuan_gagal from data_permohonan where status_permohonan = 3;`;

    //total pengajuan pending
    const pengajuan_pending =
      await prisma.$queryRaw`select count(*) as total_pengajuan_pending from data_permohonan where status_permohonan = 0;`;

    //get total liter
    const get_total_liter =
      await prisma.$queryRaw`select sum(jumlah_alokasi) from alokasi_bbm`;

    res.status(200).send({
      status: 200,
      message: `Sukses`,
      total_pemohon: String(total_pemohon[0].total_pemohon),
      total_kendaraan: String(total_kendaraan[0].total_kendaraan),
      total_pengajuan_sukses: String(
        pengajuan_sukses[0].total_pengajuan_sukses
      ),
      total_pengajuan_gagal: String(pengajuan_gagal[0].total_pengajuan_gagal),
      total_pengajuan_pending: String(
        pengajuan_pending[0].total_pengajuan_pending
      ),
      get_total_liter: Number(get_total_liter[0].sum),
    });

    // console.log(get_total_liter)
  } catch (error) {
    next(error);
  }
});

// router.get('/v1/getdate', async (req, res, next) => {
//   try {

//     const dt = new Date();
//     const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
//     var curdate = `${
//     dt.getFullYear()}-${
//     padL(dt.getMonth()+1)}-${
//     padL(dt.getDate())} ${
//     padL(dt.getHours())}:${
//     padL(dt.getMinutes())}:${
//     padL(dt.getSeconds())}`;

//     res.send(curdate);
//   } catch (error) {
//     next(error)
//   }
// });

//Kirim ulang kode OTP
router.post("/v1/resend/otp/", async (req, res, next) => {
  const { no_telepon } = req.body;
  try {
    const checkNumber =
      await prisma.$queryRaw`select no_telepon from m_user_otp where no_telepon = ${no_telepon}`;

    if (checkNumber.length === 0) {
      res.status(404).send({
        status: 404,
        message: `Maaf Nomor Telepon tidak ditemukan`,
      });
    } else {
      //resend otp
      const new_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      const change_otp =
        await prisma.$executeRaw`UPDATE m_user_otp SET otp = ${new_otp} WHERE no_telepon = ${no_telepon};`;

      res.status(200).send({
        status: 200,
        message: `OTP berhasil dikirim ulang melalui nomor whatssap anda !`,
      });

      //send wa otp
      var teks_otp = `Kode Verifikasi OTP BARU anda adalah *${new_otp}*.\nJangan berikan kode OTP anda *KEPADA SIAPAPUN* termasuk kepada petugas \n\nTerima Kasih`;
      const url = "https://app.whacenter.com/api/send";
      const data = {
        device_id: "3cd45d7ea6f0b8a856c3627004cbf92c",
        number: `${no_telepon}`,
        message: teks_otp,
      };
      const customHeaders = {
        "Content-Type": "application/json",
      };

      fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
