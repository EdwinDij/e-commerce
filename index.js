const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const port = process.env.PORT || 8000;
const sequelize  = require('./Config/db');
const userRoutes = require('./Routes/user');
const productRoutes = require('./Routes/product');

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

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.listen(port, () => console.log(`listening on port ${port}!`));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);