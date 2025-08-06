import axios from 'axios'

export default async function handler(req, res) {

  try {
    const response = await axios.get('https://api.ip2location.io', {
      params: {
        key: '46BEA0336C594E84ADDDBFCCA38AB0B0',
        format: 'json',
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    console.error('API error:', error.message)
    res.status(500).json({ error: 'Failed to fetch IP data.' })
  }
}