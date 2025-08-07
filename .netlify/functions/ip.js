import axios from 'axios'

export async function handler(event, context) {
  try {
    const API_KEY = process.env.IP2LOCATION_KEY
    if (!API_KEY) {
      throw new Error('Missing API Key: IP2LOCATION_KEY')
    }

    const response = await axios.get(`https://api.ip2location.io/?key=${API_KEY}&format=json`)
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response.data)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Function failed',
        message: err.message
      })
    }
  }
}