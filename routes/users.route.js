import express from "express";
import usersController from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

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

router.route("/:id").delete(auth, usersController.deleteUserDataByID);

router.route("/signup").post(usersController.createUser);
router.route("/login").post(usersController.getUser);
router.route("/").get(auth, usersController.getAllUsers);
router
  .route("/pic")
  .post(upload.single("avatar"), usersController.uploadPicture);
router.route("/logout").post(usersController.logout);

export default router;
