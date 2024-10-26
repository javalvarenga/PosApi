const Account = require("../models/accountModel");
const sequelize = require("../db");

exports.getAccount = async (req, res) => {
  try {
    const accountList = await Account.findAll();
    res.json(accountList);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
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


/*metodo para llamar un store procedure*/
exports.getAccountReport = async (req, res) => {
  try {
    const results = await sequelize.query(
      "CALL MostrarSaldos()",
    );

    if (Array.isArray(results)) {
      console.log("Reporte de Cuentas:", results);
      res.json(results); // Enviar los resultados como respuesta
    } else {
      res.json({ message: "No se encontraron resultados" });
    }
  } catch (error) {
    console.error("Error al ejecutar el reporte:", error);
    res.status(500).json({ message: "Error al ejecutar el reporte", error });
  }
};

/*metodo para llamar un store procedure para cambiar el saldo de una cuenta*/
exports.updateAccountSaldo = async (req, res) => {

  const { idAccount, saldoAccount } = req.body;

  try {
    const results = await sequelize.query(
      "CALL ActualizarSaldoCliente(:idAccount, :saldoAccount)",
      {
        replacements: {idAccount, saldoAccount},
        type: sequelize.QueryTypes.RAW
      }
    );

    if (Array.isArray(results)) {
      console.log("Reporte de Cuentas:", results);
      res.json(results); // Enviar los resultados como respuesta
    } else {
      res.json({ message: "No se encontraron resultados" });
    }
  } catch (error) {
    console.error("Error al ejecutar el reporte:", error);
    res.status(500).json({ message: "Error al ejecutar el reporte", error });
  }
};