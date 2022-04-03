import express from "express";
const router = express.Router();
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  unlockOneChapter,
} from "../controllers/user.js";
router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.post("/deleteUser/:id", deleteUser);
router.post("/unlockOneChapter", unlockOneChapter);
export default router;
