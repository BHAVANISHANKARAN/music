import { UserDetails } from "../models/users.model.js";
import usersService from "../services/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      response.send({ msg: "Successful login", token });
    } else {
      response.status(404).send({ msg: "Invalid credentials" });
    }
  }
}

async function getAllUsers(request, response) {
  response.send(await usersService.getUserService());
}

export default { createUser, getUser, getAllUsers };
