const express = require('express');
const app = express();
const products = require('./routes/products');
const sales = require('./routes/sales');
const categories = require('./routes/categories');
const returns = require('./routes/returns');

const cors = require('cors');
const PORT = process.env.PORT || 3001;
const version = 'api';
app.use(cors());

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(`/${version}/products`, products);
app.use(`/${version}/sales`, sales);
app.use(`/${version}/categories`, categories);
app.use(`/${version}/returns`, returns);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

app.listen(PORT, () => {
    console.log(`API running on port http://localhost:${PORT}`);
});