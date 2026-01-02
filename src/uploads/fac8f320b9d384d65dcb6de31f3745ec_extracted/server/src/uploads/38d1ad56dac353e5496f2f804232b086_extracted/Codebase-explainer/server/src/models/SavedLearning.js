const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const SavedLearning = sequelize.define("SavedLearning", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Associations
User.hasMany(SavedLearning, { foreignKey: "userId" });
SavedLearning.belongsTo(User, { foreignKey: "userId" });

module.exports = SavedLearning;
