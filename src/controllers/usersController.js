const bcrypt = require("bcrypt");
const User = require("../models/userModel");


exports.createUser = async (req, res) => {

  try {
    const { completeName, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await User.create({
      nombre: completeName,
      usuario: username,
      pass: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error al crear usuario", error });
  }

};


exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { usuario: username } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña coincide
    const isPasswordCorrect = await bcrypt.compare(password, user.dataValues.pass);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si todo va bien, responder con el usuario
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al verificar la contraseña", error });
  }
};
