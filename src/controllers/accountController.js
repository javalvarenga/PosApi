const Account = require("../models/accountModel");
const { sequelize } = require("../db");

exports.getAccount = async (req, res) => {
  try {
    const accountList = await Account.findAll();
    res.json(accountList);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

/*metodo para crear una cuenta*/
exports.createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cuenta", error });
  }
};

/*metodo para actualizar una cuenta*/
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cuenta", error });
  }
};

/*metodo para eliminar una cuenta*/
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.destroy({
      where: { id: req.params.id },
    });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cuenta", error });
  }
};

