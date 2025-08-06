import axios from 'axios'

// export default async function handler(req, res) {
//   const ip = req
//   try {
//     const response = await axios.get('https://api.ip2location.io', {
//       params: {
//         key: '46BEA0336C594E84ADDDBFCCA38AB0B0',
//         format: 'json',
//       },
//     })
//     res.status(200).json(response.data)
//   } catch (error) {
//     console.error('API error:', error.message)
//     res.status(500).json({ error: 'Failed to fetch IP data.' })
//   }
// }
export default async function handler(req, res) {
  const { ip } = req.query
  const apiKey = '46BEA0336C594E84ADDDBFCCA38AB0B0'  // ← เปลี่ยนเป็น API key ของคุณจาก ip2location.io

  if (!ip) {
    return res.status(400).json({ error: 'Missing IP address in query.' })
  }

  try {
    const response = await axios.get(`https://api.ip2location.io/?key=${apiKey}&ip=${ip}&format=json`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching IP2Location data:', error)
    res.status(500).json({ error: 'Failed to fetch geolocation data.' })
  }
}