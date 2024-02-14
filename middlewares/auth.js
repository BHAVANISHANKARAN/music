// import { request, response } from 'express'
import jwt from "jsonwebtoken";
import { UserToken } from "../models/userToken.model.js";

const auth = async (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    const tokenCheck = await UserToken.findOne({
      where: {
        token: token,
        expiry: "No",
      },
    });
    if (tokenCheck) {
      next();
    } else {
      response.status(401).send({ msg: "Login expired" });
    }
  } catch (error) {
    response.status(401).send({ msg: error.message });
  }
};

export { auth };
