const Sequelize = require("sequelize");
const connection = require("../contexts/AppContext");

const Regiones = connection.define("region", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Regiones;
