import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
// import { role } from "./role.model.js";

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
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
// UserDetails.belongsTo(role, { foreignKey: "role_id" });
// role.hasMany(UserDetails, { foreignKey: "role_id" });

// `sequelize.define` also returns the model
// console.log(UserDetails === sequelize.models.UserDetails); // true

export { UserDetails };
