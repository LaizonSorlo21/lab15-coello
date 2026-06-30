const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  }
}, {
  tableName: 'Products'
});

// Relación: Un producto pertenece a una categoría
Product.belongsTo(Category, { foreignKey: 'CategoryId', as: 'categoria' });
Category.hasMany(Product, { foreignKey: 'CategoryId' });

module.exports = Product;