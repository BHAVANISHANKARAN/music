// import { request, response } from 'express'
import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    response.status(401).send({ msg: error.message });
  }
};

export { auth };
