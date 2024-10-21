const express = require('express');
const app = express();
const products = require('./routes/products');
const PORT = process.env.PORT || 3001;
const version = 'api';
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(`/${version}/products`, products);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

app.listen(PORT, () => {
    console.log(`API running on port http://localhost:${PORT}`);
});