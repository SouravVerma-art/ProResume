import Resume from "../models/Resume.js";
import mongoose from "mongoose";

/* =========================
   CREATE RESUME
========================= */
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Resume title is required" });
        }

        const newResume = await Resume.create({
            title,
            userId: req.user._id,
            personal_info: {
                full_name: req.user.name,
                email: req.user.email,
            },
        });

        return res.status(201).json({
            message: "Resume created successfully",
            resume: newResume,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create resume" });
    }
};

/* =========================
   DELETE RESUME
========================= */
export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        const resume = await Resume.findOneAndDelete({
            _id: resumeId,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Delete failed" });
    }
};

/* =========================
   GET RESUME (PRIVATE)
========================= */
export const getResumesById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        // If no ID, get all for user
        if (!resumeId) {
            const resumes = await Resume.find({ userId: req.user._id }).sort("-updatedAt");
            return res.status(200).json({ resumes });
        }

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ resume });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Fetch failed" });
    }
};

/* =========================
   GET RESUME (PUBLIC)
========================= */
export const getPublicResumesById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, public: true },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found or private" });
        }

        return res.status(200).json({ resume });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Fetch failed" });
    }
};

/* =========================
   UPDATE RESUME
========================= */
export const updateResume = async (req, res) => {
    try {
        const { resumeId } = req.body;
        let resumeData = req.body.resumeData;

        if (!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: "Invalid resume ID" });
        }

        if (typeof resumeData === "string") {
            try {
                resumeData = JSON.parse(resumeData);
            } catch (e) {
                return res.status(400).json({ message: "Invalid resume data format" });
            }
        }

        const existingResume = await Resume.findOne({
            _id: resumeId,
            userId: req.user._id,
        });

        if (!existingResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Prepare update object
        const updateFields = {
            ...resumeData,
            // Ensure these aren't overwritten by client data if not intended
            userId: existingResume.userId, 
        };

        // Handle nested personal_info merge carefully
        if (resumeData.personal_info) {
            updateFields.personal_info = {
                ...existingResume.personal_info.toObject(),
                ...resumeData.personal_info,
            };
        }

        if (resumeData.personal_info !== undefined && !updateFields?.personal_info?.full_name?.trim()) {
            return res.status(400).json({ message: "Please add your name before saving" });
        }

        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId: req.user._id },
            { $set: updateFields },
            { new: true }
        );

        return res.status(200).json({
            message: "Saved successfully",
            resume: updatedResume,
        });

    } catch (err) {
        console.error("Update Resume Error:", err);
        return res.status(500).json({ message: "Update failed", error: err.message });
    }
};
