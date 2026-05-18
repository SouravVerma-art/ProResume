import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, default: 'Untitled Resume' },
    template: { type: String, default: "classic" },
    section_order: { type: [String], default: ["personal", "summary", "experience", "education", "project", "publications", "leadership", "skills"] },
    views: { type: Number, default: 0 },
    public: { type: Boolean, default: false },
    accent_color: { type: String, default: "#3B82F6" },
    professional_summary: { type: String, default: '' },
    personal_info: {
        full_name: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        website: { type: String, default: '' },
    },
    experience: [
        {
            company:{ type: String, default: ''},
            position:{ type: String, default: ''},
            start_date:{ type: String, default: ''},
            end_date:{ type: String, default: ''},
            description:{ type: String, default: ''},
            impact:{ type: String, default: ''}, // Quantified impact
            is_current:{ type: Boolean, default: false},
        }
    ],
    project: [
        {
            name:{ type: String, default: ''},
            type:{ type: String, default: ''},
            github:{ type: String, default: ''},
            link:{ type: String, default: ''},
            date:{ type: String, default: ''},
            description:{ type: String, default: ''},
            tech:{ type: String, default: ''}, // Tech stack
            performance:{ type: String, default: ''}, // Performance/results
        }
    ],
    publications: [
        {
            title: { type: String, default: '' },
            publisher: { type: String, default: '' },
            date: { type: String, default: '' },
        }
    ],
    leadership: [
        {
            role: { type: String, default: '' },
            organization: { type: String, default: '' },
            date: { type: String, default: '' },
            description: { type: String, default: '' }, // Mentoring/workshop contributions
        }
    ],
    education: [
        {
            institution:{ type: String, default: ''},
            degree:{ type: String, default: ''},
            field:{ type: String, default: ''},
            graduation_date:{ type: String, default: ''},
            gpa:{ type: String, default: ''},
            location:{ type: String, default: ''},
        }
    ],
    skills: {
        languages: { type: [String], default: [] },
        frameworks: { type: [String], default: [] },
        tools: { type: [String], default: [] },
        general: { type: [String], default: [] },
    },
    hobbies: { type: [String], default: [] },
    certifications: [
        {
            name: { type: String, default: '' },
            issuer: { type: String, default: '' },
            date: { type: String, default: '' },
            link: { type: String, default: '' },
        }
    ],
}, {timestamps: true, minimize: false})

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;
