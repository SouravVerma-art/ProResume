import express from "express";
import { getCurrentUser, loginUser, registerUser, googleAuth } from "../Controllers/authController.js";
import protect from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google", googleAuth);
authRouter.get("/me", protect, getCurrentUser);

export default authRouter;
