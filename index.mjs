import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello' });
});

function formatDate(date) {
    // Get individual components of the date
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    // Construct the formatted date string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

console.log('user name: ', process.env.TERRAPAY_USERNAME);
app.get('/get-test-mfs', (req, res) => {
    // https://pro-connect.terrapay.com:21211/eig/gsma/accounts/msisdn/+8801753267237/status?bnv=Faysal Ahmed&provider=88003
    axios
        .get('https://pro-connect.terrapay.com:21211/eig/getwalletlist/BD', {
            headers: {
                'X-USERNAME': process.env.TERRAPAY_USERNAME,
                'X-PASSWORD': process.env.TERRAPAY_PASSWORD,
                'X-ORIGINCOUNTRY': 'AU',
                'X-DATE': formatDate(new Date()),
                'Content-Type': 'text/json',
            },
            body: 'banks',
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
