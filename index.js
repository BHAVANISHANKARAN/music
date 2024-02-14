import express from "express";
import { Op, Sequelize } from "sequelize";
import { Music } from "./models/music.model.js";
import { sequelize } from "./config.js";
import musicRouter from "./routes/music.route.js";
import userRouter from "./routes/users.route.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import usersService from "./services/users.service.js";
import { UserToken } from "./models/userToken.model.js";

// app.post("")
// const sequelize = new Sequelize(
//   "postgres://postgres:Password@1@localhost:5432/zuci"
// );

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  await sequelize.sync();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// const music1 = await Music.create({
//   title: "All is well",
//   artist: "Harris Jayaraj",
//   releaseDate: "2012",
//   duration: 335,
//   genre: "Folk kuthu",
//   previewURL: "https://youtu.be/814PoHKDBV4?si=6RPMqmnpdFdWuQbf",
//   popularity: 79,
// });

const app = express();
app.use(express.json());

app.use("/music", musicRouter);
app.use("/users", userRouter);

// app.get("/music", getAllMusic());

// app.get("/musics", async function (request, response) {
//   var ans = request.query;
//   console.log(ans);

//   var getAllAlbum = await Music.findAll({
//     attributes: [
//       ans.name,
//       [sequelize.fn("max", sequelize.col("popularity")), "max_popularity"],
//     ],
//     group: [ans.name],
//   });
//   response.send(getAllAlbum);
// });

// app.get("/musics", async function (request, response) {
//   var arr = [];
//   const searchTerm = request.query.search;
//   console.log(searchTerm);
//   const arrayOfObjects = await Music.findAll();
//   // console.log(arrayOfObjects);

//   let found = false;
//   // response.send(Object.values(arrayOfObjects[0]));

//   for (var obj of arrayOfObjects) {
//     for (var value of Object.values(obj.toJSON())) {
//       // console.log(Object.values(obj));

//       if (value === searchTerm) {
//         // console.log(`Found ${searchTerm} in the array of objects.`);
//         // response.send(obj.toJSON());

//         arr.push(obj.toJSON());
//         found = true;
//       }
//     }
//   }
//   if (!found) {
//     response.send({ msg: "Not found" });
//   } else {
//     response.send(arr);
//   }
// });

// app.get("/musics", async function (request, response) {
//   var arr = [];
//   const searchTerm = request.query.search;
//   console.log(searchTerm);
//   const arrayOfObjects = await Music.findAll({
//     where: {
//       artist: { [Op.like]: `%${searchTerm}%` },
//     },
//   });
//   // response.send(arrayOfObjects);
//   console.log(arrayOfObjects.toJSON());
// });

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
