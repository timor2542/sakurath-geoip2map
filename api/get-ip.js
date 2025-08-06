// /api/get-ip.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://ip.ip2location.io/");
    const ip = response.data; // axios แปลง plain text เป็น string ให้เลย
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(ip);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching IP");
  }
}