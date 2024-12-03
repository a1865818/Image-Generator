import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoute.js';
import huggingFaceRoutes from './routes/huggingFaceRoute.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json( { limit: '50mb' } ));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/huggingface', huggingFaceRoutes);

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(3000, () => {
            console.log('Server is running on port http://localhost:3000');
        });
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
};

startServer();