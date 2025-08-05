import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/ip", async (req, res) => {
  try {
    const response = await fetch("https://ip.ip2location.io/?format=json");
    const data = await response.json();
    res.json(data); // ส่งต่อให้ frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch IP data" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});