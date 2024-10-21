const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('SevenPOS', 'Kevin', 'Kevin2024.', {
    host: 'sevenpos.c9pbfyeukwau.us-east-2.rds.amazonaws.com',         // O el host donde se aloje la base de datos
    dialect: 'mysql',          // Dialecto de la base de datos (en este caso, MySQL)
    logging: false,            // Desactiva el registro de las consultas en la consola
    pool: {                    // Opciones del pool de conexiones
        max: 10,                // Número máximo de conexiones en el pool
        min: 0,                // Número mínimo de conexiones en el pool
        acquire: 30000,        // Tiempo máximo que Sequelize esperará para conectar
        idle: 10000            // Tiempo que una conexión puede estar inactiva antes de cerrarse
    }
});

// Autenticar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;