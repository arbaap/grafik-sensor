const express = require("express");
const router = express.Router();
const SensorTest = require("../models/dbsensor");

router.post("/kirimSensor", async (req, res) => {
  const { suhu, kelembaban, NH3 } = req.body;

  const timestamp = new Date();

  const newSensorTest = new SensorTest({
    suhu: suhu,
    kelembaban: kelembaban,
    NH3: NH3,
  });

  try {
    const result = await newSensorTest.save();
    console.log("Berhasil menyimpan data sensor test:", result);
    res.status(200).json({ message: "Berhasil menyimpan data sensor test" });
  } catch (err) {
    console.log("Gagal menyimpan data sensor:", err);
    res.status(500).json({ message: "Gagal menyimpan data sensor" });
  }
});

router.get("/getDataSensor", async (req, res) => {
  try {
    const data = await SensorTest.find({});
    console.log("Berhasil mengambil data sensor");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data sensor:", err);
    res.status(500).json({ message: "Gagal mengambil data sensor" });
  }
});

router.get("/getDataByDate", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let query = {};

    if (startDate && endDate) {
      query = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else if (startDate) {
      query = { createdAt: { $gte: new Date(startDate) } };
    } else if (endDate) {
      query = { createdAt: { $lte: new Date(endDate) } };
    }

    const data = await SensorTest.find(query);
    console.log("Berhasil mengambil data sensor berdasarkan tanggal");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data sensor:", err);
    res.status(500).json({ message: "Gagal mengambil data sensor" });
  }
});

module.exports = router;
