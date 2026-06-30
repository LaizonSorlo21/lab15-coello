const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors({
  origin: 'https://lab15-coello-ixdb.vercel.app',
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

module.exports = app;
