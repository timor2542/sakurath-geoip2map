const axios = require('axios')

exports.handler = async function (event, context) {
  const API_KEY = process.env.IP2LOCATION_KEY
  const ipFromHeader = event.headers['x-forwarded-for']?.split(',')[0]

  try {
    const response = await axios.get(`https://api.ip2location.io/?key=${API_KEY}&ip=${ipFromHeader}&format=json`)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(response.data),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'IP lookup failed',
        message: err.message,
        debug_ip: ipFromHeader
      }),
    }
  }
}