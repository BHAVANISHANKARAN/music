import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { UserDetails } from "./users.model.js";

const UserToken = sequelize.define(
  "UserTokens",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // expiry: {
    //   type: DataTypes.STRING,
    //   defaultValue: "No",
    // },
    expired: {
      type: DataTypes.STRING,
      defaultValue: "No",
    },
  },
  {
    // Other model options go here
  }
);
// UserDetails.hasMany(UserToken, { onDelete: "cascade", hooks: true });
// UserDetails.hasMany(UserToken, { foreignKey: "user_id" });
// UserToken.belongsTo(UserDetails, { foreignKey: "user_id" });
// `sequelize.define` also returns the model
// console.log(UserToken === sequelize.models.UserToken);

export { UserToken };
