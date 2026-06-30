const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Category = require('../models/Category');

// Verificación del Middleware de autenticación (si lo usas, si no, se salta de forma segura)
const authMiddleware = require('../middleware/auth');
const verificarRol = typeof authMiddleware.verificarRol === 'function' 
  ? authMiddleware.verificarRol 
  : () => (req, res, next) => next();

// 1. Endpoint para obtener las Categorías en el catálogo
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
});

// 2. Rutas Públicas usando tus nombres exactos de controlador
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// 3. Rutas Protegidas para Administradores
router.post('/', verificarRol(['ADMIN']), productController.createProduct);
router.put('/:id', verificarRol(['ADMIN']), productController.updateProduct);
router.delete('/:id', verificarRol(['ADMIN']), productController.deleteProduct);

module.exports = router;