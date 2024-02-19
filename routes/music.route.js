import express from "express";
import musicController from "../controllers/music.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(auth, musicController.getAllMusic);
router.route("/").post(auth, musicController.createMusic);
router.route("/search").get(musicController.searchMusic);
router.route("/groupby").get(musicController.getAlbumByGroupBy);
router
  .route("/:id")
  .get(auth, musicController.getMusicByID)
  .delete(auth, musicController.deleteMusicByID)
  .put(auth, musicController.updateMusicByID);

export default router;
