import Resume from "../models/Resume.js";
import { getModel } from "../configs/ai.js";

const DEFAULT_MODEL_NAME = process.env.OPENAI_MODEL || "gemini-flash-latest";

function toClientSafeAiError(error) {
  if (process.env.NODE_ENV === "production") return "AI request failed";
  const message = error?.message || "Unknown error";
  return `AI request failed: ${message}`;
}

/* ===============================
   Enhance Professional Summary
================================ */
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent?.trim()) {
      return res
        .status(400)
        .json({ message: "Professional summary is required" });
    }

    const model = getModel(DEFAULT_MODEL_NAME);
    const prompt = `You are an expert resume writer. Rewrite the professional summary in 1-2 concise, ATS-friendly sentences. Highlight key skills, experience, and career goals. Return only plain text (no formatting, bullets, or quotes).

Summary to enhance: ${userContent}`;

    const result = await model.generateContent(prompt);
    const enhancedContent = result.response.text().trim();

    if (!enhancedContent) {
      throw new Error("Empty AI response");
    }

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("AI summary error:", error);
    const detail = toClientSafeAiError(error);
    return res
      .status(500)
      .json({ 
        message: `Failed to enhance summary: ${detail}`,
        detail 
      });
  }
};

/* ===============================
   Enhance Job Description
================================ */
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent?.trim()) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const model = getModel(DEFAULT_MODEL_NAME);
    const prompt = `You are an expert resume writer. Rewrite the job description in 1-2 impactful sentences using strong action verbs and measurable achievements. Return only plain text (no formatting, bullets, or quotes).

Job description to enhance: ${userContent}`;

    const result = await model.generateContent(prompt);
    const enhancedContent = result.response.text().trim();

    if (!enhancedContent) {
      throw new Error("Empty AI response");
    }

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("AI job desc error:", error);
    const detail = toClientSafeAiError(error);
    return res.status(500).json({
      message: `Failed to enhance job description: ${detail}`,
      detail,
    });
  }
};

/* ===============================
   Upload Resume (AI Extraction)
================================ */
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const file = req.file;

    if (!resumeText?.trim() && !file) {
      return res.status(400).json({ message: "Resume text or file is required" });
    }

    const model = getModel(DEFAULT_MODEL_NAME);
    const prompt = `You are an AI resume parser. Extract structured data from the resume text or file and return ONLY valid JSON (no markdown, code blocks, or extra text).

Extract resume data and return JSON ONLY using this exact schema:

{
  "professional_summary": "",
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "experience": [{
    "company": "",
    "position": "",
    "start_date": "",
    "end_date": "",
    "description": "",
    "impact": "",
    "is_current": false
  }],
  "project": [{
    "name": "",
    "type": "",
    "github": "",
    "date": "",
    "description": "",
    "tech": "",
    "performance": ""
  }],
  "education": [{
    "institution": "",
    "degree": "",
    "field": "",
    "graduation_date": "",
    "location": "",
    "gpa": ""
  }],
  "publications": [{
    "title": "",
    "publisher": "",
    "date": ""
  }],
  "leadership": [{
    "role": "",
    "organization": "",
    "date": "",
    "description": ""
  }],
  "skills": {
    "languages": [],
    "frameworks": [],
    "tools": []
  }
}

Important:
- Start and end dates should be in YYYY-MM format if possible.
- If a field is not found, leave it as an empty string or empty array/object as per schema.
- For Experience description, use bullet points separated by newlines.
`;

    let result;
    if (file) {
      const parts = [
        {
          inlineData: {
            data: file.buffer.toString("base64"),
            mimeType: file.mimetype,
          },
        },
        { text: prompt },
      ];
      result = await model.generateContent(parts);
    } else {
      result = await model.generateContent(`${prompt}\n\nResume Text:\n${resumeText}`);
    }

    let responseText = result.response.text().trim();
    
    if (!responseText) {
      throw new Error("Empty AI response");
    }

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI response did not contain valid JSON");
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    if (!parsedData?.personal_info?.full_name) {
      return res.status(400).json({ message: "Resume must contain a full name" });
    }

    const newResume = await Resume.create({
      userId: req.user._id,
      title: title || "Uploaded Resume",
      ...parsedData,
    });

    return res.status(201).json({
      resumeId: newResume._id,
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.error("Upload resume error:", error);
    return res
      .status(500)
      .json({ message: "Resume upload failed: " + error.message });
  }
};

/* ===============================
   Generate Cover Letter
================================ */
export const generateCoverLetter = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription?.trim()) {
      return res.status(400).json({ message: "Resume data and job description are required" });
    }

    const model = getModel(DEFAULT_MODEL_NAME);
    const prompt = `You are an expert career coach. Write a professional, compelling cover letter based on the provided resume data and job description. Keep it under 400 words. Return only plain text.

Resume Data: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}`;

    const result = await model.generateContent(prompt);
    let coverLetter = result.response.text().trim();
    
    // Clean up any markdown code blocks if the AI included them
    coverLetter = coverLetter.replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "").replace(/^```/i, "").replace(/```$/i, "");
    
    return res.status(200).json({ coverLetter });
  } catch (error) {
    console.error("Cover letter error:", error);
    return res.status(500).json({ message: "Failed to generate cover letter", detail: toClientSafeAiError(error) });
  }
};

/* ===============================
   ATS Resume Scorer
================================ */
export const scoreResume = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription?.trim()) {
      return res.status(400).json({ message: "Resume data and job description are required" });
    }

    const model = getModel(DEFAULT_MODEL_NAME);
    const prompt = `You are an ATS (Applicant Tracking System) specialist. Compare the resume to the job description and provide a score and feedback. Return ONLY valid JSON.

Compare this resume to this job description and return a JSON object with this schema:
{
  "score": number (0-100),
  "matching_keywords": ["kw1", "kw2"],
  "missing_keywords": ["kw3", "kw4"],
  "suggestions": ["suggestion1", "suggestion2"]
}

Resume: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI response did not contain valid JSON");
    }

    return res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (error) {
    console.error("Scoring error:", error);
    return res.status(500).json({ message: "Failed to score resume", detail: toClientSafeAiError(error) });
  }
};
