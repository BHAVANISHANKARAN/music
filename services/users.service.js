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

async function addToken(user_id, token) {
  return await UserToken.create({ user_id: user_id, token });
}

async function updateAvatar(url, user_id) {
  return await UserDetails.update(
    { avatar: url },
    {
      where: {
        id: user_id,
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
  return await UserToken.update({ expired: "yes" }, { where: { user_id: id } });
}

async function searchMusicQuery(searchTerm) {
  return await Music.findAll({
    where: {
      artist: { [Op.like]: `%${searchTerm}%` },
    },
  });
}

export default {
  createUserQuery,
  getUserByName,
  getUserService,
  addToken,
  updateAvatar,
  getIDByToken,
  updateExpiry,
  searchMusicQuery,
};
