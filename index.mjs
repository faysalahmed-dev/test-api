import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello' });
});

app.listen(5555, () => {
    console.log('server is running on the port: 5555');
});
