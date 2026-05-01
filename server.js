const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

// 🔥 FIRE PROXY (NASA)
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});