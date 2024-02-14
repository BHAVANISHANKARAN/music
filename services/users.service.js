import { UserDetails } from "../models/users.model.js";
import { UserToken } from "../models/userToken.model.js";

async function createUserQuery({ username, password }) {
  try {
    // console.log(username, password);
    return await UserDetails.create({ username, password });
  } catch (error) {
    // return { msg: error.errors.map((val) => val.message).join() };
    return { msg: error.errors.map((val) => val.message).join() };
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
  return await UserToken.create({ userID, token });
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
export default {
  createUserQuery,
  getUserByName,
  getUserService,
  addToken,
  updateAvatar,
};
