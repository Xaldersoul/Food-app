const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      },
      defaultValue: 0
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      },
      defaultValue: 0
    },
    instructions: {
      type: DataTypes.TEXT
    },
    origin: {
      type: DataTypes.STRING,
      defaultValue: "db"
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://img.huffingtonpost.com/asset/5d41c4a2260000ad0f045f4a.png"
    },
  }, {
    timestamps: false
  });
};
