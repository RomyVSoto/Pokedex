const Sequelize = require("sequelize");
const connection = require("../contexts/AppContext");

const Tipos = require("./Tipos");
const Regiones = require("./Regiones");

const Pokemones = connection.define("pokemon", {
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
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Tipos,
            key: 'id'
        }
    },
    regionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Regiones,
            key: 'id'
        }
    }
});

Pokemones.belongsTo(Tipos, { foreignKey: "typeId", as: "tipo" });
Tipos.hasMany(Pokemones, { foreignKey: "typeId" });

Pokemones.belongsTo(Regiones, { foreignKey: "regionId", as: "region" });
Regiones.hasMany(Pokemones, { foreignKey: "regionId" });

module.exports = Pokemones;
