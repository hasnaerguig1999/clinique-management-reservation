const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reclamation = sequelize.define("reclamations", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    objet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false, 
});

module.exports = Reclamation;
