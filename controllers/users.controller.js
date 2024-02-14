import { UserDetails } from "../models/users.model.js";
import usersService from "../services/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

async function genHashPassword(userPassword) {
  const NO_OF_ROUNDS = 10;

  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);

  const hashedPassword = await bcrypt.hash(userPassword, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

async function createUser(request, response) {
  console.log(request.body);

  const { username, password } = request.body;
  if (password.length <= 8) {
    response
      .status(400)
      .send({ msg: "Password should be more than 8 characters" });
  } else {
    const hashedPassword = await genHashPassword(password);
    console.log(hashedPassword);
    response.send(
      await usersService.createUserQuery({ username, password: hashedPassword })
    );
  }

  //   var insertedValue = await usersService.createUserQuery(username, password);

  //   response.send(insertedValue);
  //   response.send();
}

async function getUser(request, response) {
  console.log(request.body);

  const { username, password } = request.body;
  const userFromDB = await usersService.getUserByName({ username });
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ msg: "Invalid credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);

    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB.id }, process.env.SECRET_KEY);
      usersService.addToken(userFromDB.id, token);
      response.send({ msg: "Successful login", token });
    } else {
      response.status(404).send({ msg: "Invalid credentials" });
    }
  }
}

async function getAllUsers(request, response) {
  response.send(await usersService.getUserService());
}

async function uploadPicture(request, response) {
  cloudinary.config({
    secure: true,
  });

  const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(cloudinary.config());
  (async () => {
    const imagePath = request.file.path;
    const res = await uploadImage(imagePath);
    console.log(res);
    response.send({ msg: "uploaded successfully", image: res.secure_url });
    var tokenKey = request.header("x-auth-token");
    // console.log("-------------------------", tokenKey);
    const id = await usersService.getIDByToken(tokenKey);
    // console.log("------------------------------", id);

    await usersService.updateAvatar(res.secure_url, id.user_id);
    console.log("Updated...............");
  })();
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  const id = await usersService.getIDByToken(token_key);
  await usersService.updateExpiry(id.user_id);
  response.send("token expired");
}

async function deleteUserDataByID(request, response) {
  const { id } = request.params;
  const tokenId = request.header("x-auth-token");
  const sessionToken = await usersService.sessionCheckToken(tokenId);
  const findingUserRoleID = await usersService.checkingRoleID(
    sessionToken.dataValues.user_id
  );
  console.log(sessionToken.dataValues.user_id);
  // const findingRoleData = await usersService.checkingRoleDatabyId(findingUserRoleID.dataValues.role_id)
  console.log(findingUserRoleID.dataValues.role_id);
  if (findingUserRoleID.dataValues.role_id == 3) {
    const userDataDelete = await usersService.distoryMovieDataByID(id);
    console.log(userDataDelete);
    const not_Found = { msg: "Not found" };
    userDataDelete
      ? response.send("Deleted")
      : response.status(404).send(not_Found);
    // } catch (err) {
    //   response.send({ msg: err });
    // }
  }
}

export default {
  createUser,
  getUser,
  getAllUsers,
  uploadPicture,
  logout,
  deleteUserDataByID,
};
