import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello' });
});

console.log('user name: ', process.env.TERRAPAY_USERNAME);
app.get('/get-test-mfs', (req, res) => {
    axios
        .get('https://uat-connect.terrapay.com:21211/eig/getwalletlist/BD', {
            headers: {
                'X-USERNAME': process.env.TERRAPAY_USERNAME,
                'X-PASSWORD': process.env.TERRAPAY_PASSWORD,
                'X-ORIGINCOUNTRY': 'AU',
                'X-DATE': formatDate(new Date()),
            },
        })
        .then(result => {
            res.json({ data: result.data });
        })
        .catch(err => {
            res.json({ error: err });
        });
});

app.listen(5555, () => {
    console.log('server is running on the port: 5555');
});
