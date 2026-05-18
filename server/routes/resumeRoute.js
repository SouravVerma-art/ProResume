import express from "express";
import { createResume, deleteResume, getPublicResumesById, getResumesById, updateResume } from "../Controllers/resumeController.js";
import protect from "../middlewares/auth.js";

const resumeRouter = express.Router();

resumeRouter.get("/public/:resumeId", getPublicResumesById);
resumeRouter.use(protect);
resumeRouter.get("/", getResumesById);
resumeRouter.post("/create", createResume);
resumeRouter.put("/upload", updateResume);
resumeRouter.put("/update", updateResume);
resumeRouter.delete("/delete/:resumeId", deleteResume);
resumeRouter.get("/get/:resumeId", getResumesById);

export default resumeRouter;
