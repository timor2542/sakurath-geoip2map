import axios from 'axios'

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://ip.ip2location.io/')
    const data = response.data  // axios automatically parses JSON (even if it's text/plain)

    res.status(200).json(data)
  } catch (error) {
    console.error('Failed to fetch IP:', error)
    res.status(500).json({ error: 'Failed to fetch IP' })
  }
}