// import axios from 'axios'

// export default async function handler(req, res) {

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
  const ip = req.query.ip
  const apiKey = '46BEA0336C594E84ADDDBFCCA38AB0B0'
  try {
    const response = await fetch(`https://api.ip2location.io/?key=${apiKey}&ip=${ip}&format=json`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch geolocation' })
  }
}