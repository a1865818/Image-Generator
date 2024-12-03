import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from Hugging Face!' });
});

router.route('/').post(async (req, res) => {
    try {
        console.log('Received request:', req.body); // Log the request body

        const { prompt } = req.body;

        const response = await axios.post(process.env.HUGGINGFACE_API_CONNECT_LINK, {
            inputs: prompt
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
            },
            responseType: 'arraybuffer' // Expect binary data
        });

        console.log('API response received'); // Log the response

        const base64Image = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
        // console.log('Formatted base64Image:', base64Image); // Debugging log

        res.status(200).json({ photo: base64Image });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: error.response && error.response.data && error.response.data.error
                ? error.response.data.error.message
                : 'Something went wrong'
        });
    }
});


export default router;
