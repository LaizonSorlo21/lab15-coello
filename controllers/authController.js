const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;
    
    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ message: 'El correo ya está registrado' });

    const passwordHash = await bcrypt.hash(password, 10);
    
    const nuevoUsuario = await User.create({
      username,
      email,
      password: passwordHash,
      rol: rol || 'CUSTOMER'
    });

    const token = jwt.sign(
      { id: nuevoUsuario.id, username: nuevoUsuario.username, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET || 'secreto_lab15',
      { expiresIn: '4h' }
    );

    return res.status(201).json({ token, message: 'Usuario registrado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_lab15',
      { expiresIn: '4h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};