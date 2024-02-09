const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

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

const sensortestSchema = new mongoose.Schema({
  suhu: Number,
  kelembaban: Number,
  NH3: Number,
});

const SensorTest = mongoose.model("SensorTest", sensortestSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/kirimdata", async (req, res) => {
  const { suhu, kelembaban } = req.body;

  const newSensor = new Sensor({
    suhu: suhu,
    kelembaban: kelembaban,
  });

  try {
    const result = await newSensor.save();
    console.log("Berhasil menyimpan data sensor:", result);
    res.status(200).json({ message: "Berhasil menyimpan data sensor" });
  } catch (err) {
    console.log("Gagal menyimpan data sensor:", err);
    res.status(500).json({ message: "Gagal menyimpan data sensor" });
  }
});

app.post("/kirimdatatest", async (req, res) => {
  const { suhu, kelembaban, NH3 } = req.body;

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

app.get("/ambildata", async (req, res) => {
  try {
    const data = await Sensor.find({});
    console.log("Berhasil mengambil data sensor");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data sensor:", err);
    res.status(500).json({ message: "Gagal mengambil data sensor" });
  }
});

app.get("/ambildatatest", async (req, res) => {
  try {
    const data = await SensorTest.find({});
    console.log("Berhasil mengambil data sensor");
    res.status(200).json(data);
  } catch (err) {
    console.log("Gagal mengambil data sensor:", err);
    res.status(500).json({ message: "Gagal mengambil data sensor" });
  }
});

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
