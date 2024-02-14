import { UserDetails } from "../models/users.model.js";
import { UserToken } from "../models/userToken.model.js";

async function createUserQuery({ username, password }) {
  try {
    // console.log(username, password);
    return await UserDetails.create({ username, password });
  } catch (error) {
    // return { msg: error.errors.map((val) => val.message).join() };
    return { msg: error };
  }
}

async function getUserByName({ username }) {
  return await UserDetails.findOne({
    where: { username },
  });
}

async function getUserService() {
  return await UserDetails.findAll();
}

async function addToken(userID, token) {
  return await UserToken.create({ user_id: userID, token });
}

async function updateAvatar(url, userID) {
  return await UserDetails.update(
    { avatar: url },
    {
      where: {
        id: userID,
      },
    }
  );
}
async function getIDByToken(tokenKey) {
  return await UserToken.findOne({
    where: {
      token: tokenKey,
    },
  });
}

async function updateExpiry(id) {
  return await UserToken.update({ expired: "yes" }, { where: { userID: id } });
}

export default {
  createUserQuery,
  getUserByName,
  getUserService,
  addToken,
  updateAvatar,
  getIDByToken,
  updateExpiry,
};
