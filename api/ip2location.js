export default async function handler(req, res) {
  const { ip } = req.query
  const apiKey = '46BEA0336C594E84ADDDBFCCA38AB0B0' // ← เปลี่ยนเป็นของคุณเอง

  try {
    const response = await fetch(`https://api.ip2location.io/?key=${apiKey}&ip=${ip}&format=json`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Failed to fetch geolocation:', error)
    res.status(500).json({ error: 'Failed to fetch geolocation' })
  }
}