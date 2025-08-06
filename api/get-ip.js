import fetch from 'node-fetch';
export default async function handler(req, res) {
    try {
      const response = await fetch("https://ip.ip2location.io/?format=txt");
      const textData = await response.text(); // ดึงเป็น text
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(textData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching IP" });
    }
  }