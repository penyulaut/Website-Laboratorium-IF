const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lab.local";
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let adminUsers = [];
async function ensureDefaultAdmin() {
  if (!adminUsers.find((u) => u.email === DEFAULT_ADMIN_EMAIL)) {
    const passHash = await bcrypt.hash(DEFAULT_ADMIN_PASS, 10);
    adminUsers.push({ id: Date.now(), email: DEFAULT_ADMIN_EMAIL, passHash });
    console.log("Default admin siap:", DEFAULT_ADMIN_EMAIL);
  }
}
ensureDefaultAdmin();

let labStatus = {
  open: true,
  updatedAt: new Date(),
  note: "Operasional normal",
};
let schedules = [
  { id: 1, title: "Praktikum Jaringan", start: "2025-08-26", allDay: true },
  {
    id: 2,
    title: "Seminar Informatika",
    start: "2025-08-28",
    end: "2025-08-29",
  },
  { id: 3, title: "Ujian Praktikum", start: "2025-09-05", allDay: true },
];
let articles = [
  {
    id: 1,
    title: "Tips Memilih Laptop untuk Mahasiswa",
    slug: "tips-memilih-laptop",
    excerpt: "Memilih laptop yang tepat penting bagi mahasiswa...",
    body: "Konten lengkap artikel...",
    createdAt: new Date(),
  },
];
let reservations = [];

function authMiddleware(req, _res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    const token = header.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: e,
      });
    }
  }
  next();
}
app.use(authMiddleware);

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin")
    return res.status(401).json({ error: "Unauthorized" });
  next();
}

// AUTH endpoints
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email & password wajib" });
  if (adminUsers.find((u) => u.email === email))
    return res.status(409).json({ error: "Email sudah terdaftar" });
  const passHash = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, passHash };
  adminUsers.push(user);
  res.status(201).json({ id: user.id, email: user.email });
});
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = adminUsers.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Kredensial salah" });
  const ok = await bcrypt.compare(password, user.passHash);
  if (!ok) return res.status(401).json({ error: "Kredensial salah" });
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: "admin" },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.json({ token });
});

app.get("/", (_req, res) => {
  res.json({ service: "Lab API", status: "ok" });
});

// STATUS LAB
app.get("/api/status", (_req, res) => {
  res.json(labStatus);
});
app.patch("/api/status", requireAdmin, (req, res) => {
  const { open, note } = req.body;
  if (typeof open === "boolean") labStatus.open = open;
  if (typeof note === "string") labStatus.note = note;
  labStatus.updatedAt = new Date();
  res.json(labStatus);
});

// JADWAL (Schedules)
app.get("/api/schedules", (_req, res) => {
  res.json(schedules);
});
app.post("/api/schedules", requireAdmin, (req, res) => {
  const { title, start, end, allDay } = req.body;
  if (!title || !start)
    return res.status(400).json({ error: "title & start wajib" });
  const id = Date.now();
  const evt = { id, title, start, end, allDay: !!allDay };
  schedules.push(evt);
  res.status(201).json(evt);
});
app.delete("/api/schedules/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  schedules = schedules.filter((e) => e.id !== id);
  res.status(204).end();
});

// ARTIKEL
app.get("/api/articles", (_req, res) => {
  res.json(
    articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      createdAt: a.createdAt,
    }))
  );
});
app.get("/api/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const art = articles.find((a) => a.id === id);
  if (!art) return res.status(404).json({ error: "Artikel tidak ditemukan" });
  res.json(art);
});
app.post("/api/articles", requireAdmin, (req, res) => {
  const { title, body, excerpt } = req.body;
  if (!title || !body)
    return res.status(400).json({ error: "title & body wajib" });
  const id = Date.now();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const art = {
    id,
    title,
    slug,
    body,
    excerpt: excerpt || body.slice(0, 100) + "...",
    createdAt: new Date(),
  };
  articles.unshift(art);
  res.status(201).json(art);
});

// RESERVASI
app.get("/api/reservations", requireAdmin, (_req, res) => {
  res.json(reservations);
});
app.post("/api/reservations", (req, res) => {
  const { name, email, purpose, start, end } = req.body;
  if (!name || !email || !purpose || !start || !end)
    return res.status(400).json({ error: "Field wajib belum lengkap" });
  const id = Date.now();
  const reservation = {
    id,
    name,
    email,
    purpose,
    start,
    end,
    status: "pending",
    createdAt: new Date(),
  };
  reservations.push(reservation);
  res
    .status(201)
    .json({ message: "Reservasi diterima (pending)", reservation });
});
app.patch("/api/reservations/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const r = reservations.find((r) => r.id === id);
  if (!r) return res.status(404).json({ error: "Reservasi tidak ditemukan" });
  const { status } = req.body;
  if (status && ["pending", "approved", "rejected"].includes(status)) {
    r.status = status;
    if (status === "approved") {
      // otomatis buat schedule
      schedules.push({
        id: Date.now(),
        title: `Reservasi: ${r.purpose}`,
        start: r.start,
        end: r.end,
      });
    }
  }
  res.json(r);
});

// Error fallback
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend berjalan di http://localhost:${PORT}`)
);
