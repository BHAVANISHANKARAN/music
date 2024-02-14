import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const UserToken = sequelize.define(
  "UserTokens",
  {
    // Model attributes are defined here
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
    },
    expired: {
      type: DataTypes.STRING,
      defaultValue: "No",
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
// console.log(UserDetails === sequelize.models.User); // true

export { UserToken };
