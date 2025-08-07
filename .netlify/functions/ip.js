import axios from 'axios'

export async function handler(event, context) {
  const API_KEY = process.env.IP2LOCATION_KEY
  const url = `https://api.ip2location.io/?key=${API_KEY}&format=json`

  try {
    const response = await axios.get(url)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // เผื่อ CORS
      },
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch IP location',
        details: error.message,
      }),
    }
  }
}