import axios from 'axios'

export default async function handler(req, res) {
  try {
    const response = await fetch('https://ip.ip2location.io/')
    const text = await response.text()
    const data = JSON.parse(text)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data)
  } catch (error) {
    console.error('Failed to fetch IP:', error)
    res.status(500).json({ error: 'Failed to fetch IP' })
  }
}