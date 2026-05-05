const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static("public"));

// ===============================
// ✅ ТЕСТ (безопасный)
// ===============================
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

// ===============================
// 🏝️ RESORTS API
// ===============================
app.get("/api/resorts", (req, res) => {
  try {
    const filePath = path.join(__dirname, "resorts.json");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "resorts.json not found" });
    }

    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));

  } catch (err) {
    console.error("RESORTS ERROR:", err);
    res.status(500).json({ error: "Failed to load resorts" });
  }
});

// ===============================
// 🔥 FIRE PROXY (NASA)
// ===============================
app.get("/fires", async (req, res) => {
  try {
    const url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis/c6_1/MODIS_C6_1_Global_24h.csv";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("NASA response error: " + response.status);
    }

    const text = await response.text();
    res.send(text);

  } catch (err) {
    console.error("FIRE ERROR:", err.message);
    res.status(500).send("Error loading fires");
  }
});

// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});