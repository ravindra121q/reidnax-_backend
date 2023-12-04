const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connection = require("./Database/db");
const router = require("./routes/AllRoutes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", router);
const dbConnect = async () => {
  await connection;
  console.log("connected");
};

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
