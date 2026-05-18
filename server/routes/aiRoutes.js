import express from "express";
import {
    enhanceJobDescription,
    enhanceProfessionalSummary,
    uploadResume,
    generateCoverLetter,
    scoreResume
} from "../Controllers/aiController.js";
import protect from "../middlewares/auth.js";
import upload from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.use(protect);

// Aliases for both old and new route names for compatibility
aiRouter.post("/enhance-pro-sum", enhanceProfessionalSummary);
aiRouter.post("/enhance-professional-summary", enhanceProfessionalSummary);

aiRouter.post("/enhance-job-desc", enhanceJobDescription);
aiRouter.post("/enhance-job-description", enhanceJobDescription);

aiRouter.post("/upload-resume", upload.single('resume'), uploadResume);

aiRouter.post("/generate-cover-letter", generateCoverLetter);
aiRouter.post("/score-resume", scoreResume);

export default aiRouter;
