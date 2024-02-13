import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const UserDetails = sequelize.define(
  "UserDetails",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(UserDetails === sequelize.models.User); // true

export { UserDetails };
