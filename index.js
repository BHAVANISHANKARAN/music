import express from "express";
import { Sequelize } from "sequelize";
import { Music } from "./models/music.model.js";
import { sequelize } from "./config.js";
import musicRouter from "./routes/music.route.js";
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

// app.get("/music/:id", getMusicByID());

// app.post("/music", createMusic());

// app.delete("/music/:id", deleteUserByID());

// app.put("/music/:id", updateMusicByID());

app.get("/music/search", (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).json({ error: "No search term provided" });
  }

  // Search the database for books related to Shakespeare
  const results = musicDatabase.filter((music) =>
    music.author.toLowerCase().includes("shakespeare")
  );

  res.json(results);
});

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
