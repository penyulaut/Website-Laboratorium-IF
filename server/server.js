const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Berhasil terhubung ke MongoDB"))
  .catch((err) => console.error("Gagal terhubung ke MongoDB:", err));

const cors = require("cors");

const multer = require("multer");
const path = require("path");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inilah my backend");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const artikelRoute = require("./routes/artikelRoute");
const statusRoute = require("./routes/statusRoute");
const resvRoute = require("./routes/resvRoute");
const authRoutes = require("./routes/authRoute");
const { authRequired } = require("./middleware/authMiddleware");
const authController = require("./controller/authController");
const kontakRoute = require("./routes/kontakRoute");

// Inisialisasi admin default jika kosong
authController.init();

app.use("/auth", authRoutes);
app.use("/status", statusRoute); // nanti akan proteksi PATCH di route file
app.use("/artikel", artikelRoute); // proteksi non-GET di route file
app.use("/reservasi", resvRoute); // proteksi update status via route file
app.use("/kontak", kontakRoute);

app.listen(port, () => {
  console.log(`server lagi jalan nih di http://localhost:${port}`);
});
