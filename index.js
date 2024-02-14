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

const storage = multer.diskStorage({
  // destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

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

cloudinary.config({
  secure: true,
});

console.log(cloudinary.config());

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

app.post("/users/pic", upload.single("avatar"), function (request, response) {
  // response.send({ msg: "uploaded successfully" });
  // console.log(request.file);
  // console.log(request.body);
  (async () => {
    const imagePath = request.file.path;
    const res = await uploadImage(imagePath);
    console.log(res);
    response.send({ msg: "uploaded successfully", image: res.secure_url });
    var tokenKey = request.header("x-auth-token");
    const id = await UserToken.findOne({
      where: {
        token: tokenKey,
      },
    });
    await usersService.updateAvatar(res.secure_url, id.userID);
    console.log("Updated...............");
  })();
});

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
