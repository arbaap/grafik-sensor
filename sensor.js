const express = require("express");

const app = express();

const dbConfig = require("./mongoDB");

const sensorRoute = require("./routes/sensorRoute");

app.use(express.json());

app.use("/api/sensors", sensorRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server Sensor is running on port", port));
