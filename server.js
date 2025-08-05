import express from 'express';
import axios from 'axios';
import cors from 'cors';
const PORT = process.env.PORT || 3000

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

app.get('/api/ip2location', async (req, res) => {
    try {
      const { ip } = req.query
      const response = await axios.get('https://api.ip2location.io', {
        params: {
          key: '46BEA0336C594E84ADDDBFCCA38AB0B0',
          format: 'json',
          ip,
        },
      })
      res.json(response.data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});