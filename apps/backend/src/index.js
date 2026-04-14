require("dotenv").config();
require("dotenv").config({ path: require("path").resolve(__dirname, "../../../db/.env") });

const express = require("express");
const cors = require("cors");
const prisma = require("./db");

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000"
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/testimonials", async (_req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonials." });
  }
});

app.post("/testimonials", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res
        .status(400)
        .json({ error: "Name and message are required fields." });
    }

    const testimonial = await prisma.testimonial.create({
      data: { name, message }
    });

    return res.status(201).json(testimonial);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create testimonial." });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
