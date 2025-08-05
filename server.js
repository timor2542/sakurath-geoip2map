// server.js
import express from 'express'
import get from 'axios'
import cors from 'cors'

const app = express()
const PORT = 3000

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/api/ip2location', async (req, res) => {
  try {
    const { ip } = req.query
    const response = await get('https://api.ip2location.io', {
      params: {
        key: '46BEA0336C594E84ADDDBFCCA38AB0B0',
        format: 'json',
        ip,
      },
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})