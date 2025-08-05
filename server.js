import express from 'express';
import axios from 'axios';
import cors from 'cors';
const PORT = process.env.PORT || 3000

app.use(cors());

app.get('/api/ip2location', async (req, res) => {
    const { ip } = req.query

    try {
        const response = await axios.get('https://api.ip2location.io', {
            params: {
                key: '46BEA0336C594E84ADDDBFCCA38AB0B0',
                format: 'json',
                ip,
            },
        })
        res.status(200).json(response.data)
    } catch (error) {
        console.error('API error:', error.message)
        res.status(500).json({ error: 'Failed to fetch IP data.' })
    }
})

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});