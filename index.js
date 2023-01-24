const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const port = process.env.PORT || 8000;

const {sequelize} = require('./config/db');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

async function connectDb () {
    try  {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDb();


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
