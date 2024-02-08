const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Tambahkan modul CORS

const app = express();

// Menghilangkan penggunaan opsi yang sudah tidak diperlukan

var mongoURL =
  "mongodb+srv://uinjek:uinjek@cluster0.93sie2d.mongodb.net/kibidb";

mongoose.connect(mongoURL);

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Success");
});

const sensorSchema = new mongoose.Schema({
  suhu: Number,
  kelembaban: Number,
});

const Sensor = mongoose.model("Sensor", sensorSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Tambahkan middleware CORS

app.post("/kirimdata", async (req, res) => {
  const { suhu, kelembaban, NH3 } = req.body;

  // Membuat instance sensor baru
  const newSensor = new Sensor({
    suhu: suhu,
    kelembaban: kelembaban,
  });

  try {
    // Menggunakan async/await untuk menyimpan data
    const result = await newSensor.save();
    console.log("Berhasil menyimpan data sensor:", result);
    res.status(200).json({ message: "Berhasil menyimpan data sensor" });
  } catch (err) {
    console.log("Gagal menyimpan data sensor:", err);
    res.status(500).json({ message: "Gagal menyimpan data sensor" });
  }
});

app.get("/ambildata", async (req, res) => {
  try {
    // Mengambil semua data sensor dari database
    const data = await Sensor.find({});
    console.log("Berhasil mengambil data sensor");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data sensor:", err);
    res.status(500).json({ message: "Gagal mengambil data sensor" });
  }
});

// Menjalankan server pada port tertentu
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
