export default async function handler(req, res) {
    try {
      const response = await fetch('https://ip.ip2location.io/?format=json')
      const data = await response.text()
      res.status(200).json(data)
    } catch (error) {
      console.error('Failed to fetch IP:', error)
      res.status(500).json({ error: 'Failed to fetch IP' })
    }
  }