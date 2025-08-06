import fetch from 'node-fetch';
// export default async function handler(req, res) {
//     try {
//       const response = await fetch("https://ip.ip2location.io/?format=txt");
//       const textData = await response.text(); // ดึงเป็น text
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.status(200).send(textData);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching IP" });
//     }
//   }
export default async function handler(req, res) {
    try {
        const apiKey = '46BEA0336C594E84ADDDBFCCA38AB0B0'
      const response = await fetch(`https://api.ip2location.io/?key=${apiKey}&format=json`);
      const data = await response.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching IP data" });
    }
  }