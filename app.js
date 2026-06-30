const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); 
const authRoutes = require('./routes/authRoutes'); // Dejamos listo el de auth por si acaso

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Enlaces de la API global
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;