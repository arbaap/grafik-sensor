const express = require("express");

const app = express();

const dbConfig = require("./mongoDB");

const sensorRoute = require("./routes/sensorRoute");

app.use(express.json());

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Server Jalan",
    message: "Server siap digunakan!",
  });
});

app.use("/api/sensors", sensorRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server Sensor is running on port", port));
