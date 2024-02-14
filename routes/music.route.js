import express from "express";
import musicController from "../controllers/music.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.route("/").get(auth, musicController.getAllMusic);
router.route("/").post(musicController.createMusic);

router
  .route("/:id")
  .get(musicController.getMusicByID)
  .delete(musicController.deleteMusicByID)
  .put(musicController.updateMusicByID);

export default router;
