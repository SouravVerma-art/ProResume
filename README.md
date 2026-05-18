# ProResume AI - Modern Resume Builder

A production-grade, AI-powered resume builder designed to help job seekers create ATS-optimized, professional resumes with ease. Built with a focus on security, scalability, and seamless user experience.

![License](https://img.shields.io/badge/license-ISC-blue)
![React](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)
![Node](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248)

## Key Features

- ** AI-Powered Content**: Transform basic bullet points into high-impact achievements using Google Gemini AI.
- ** Real-time Autosave**: Never lose progress. Changes are automatically saved in the background.
- ** Pro Templates**: Choose from Modern, Classic, Minimal, or Regular layouts.
- ** Custom Styling**: Real-time accent color picker to match your personal brand.
- ** Live Public Links**: Host your resume online and share it via a unique URL.
- ** Smart PDF Export**: High-fidelity PDF generation with fully functional, clickable links.
- ** ATS Analysis**: Get feedback on your resume's compatibility with applicant tracking systems.
- ** Senior-Grade Security**: Helmet-secured headers, rate-limiting, and centralized error handling.

##  Technical Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, `@hello-pangea/dnd` (Drag & Drop).
- **Backend**: Node.js, Express.js (v5), MongoDB (Mongoose).
- **AI Integration**: Google Generative AI (Gemini).
- **PDF Engine**: `html-to-image` + `jsPDF` with custom coordinate mapping for link interactivity.

##  Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Resume_Builder_Fixed
   ```

2. **Backend Setup**
   ```bash
   cd server
   cp .env.example .env
   # Fill in your MONGODB_URI and GEMINI_API_KEY
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   cp .env.example .env
   npm install
   npm run dev
   ```

## Architecture

Following a modular, component-based architecture for maximum maintainability:

```text
client/src/
├── components/
│   ├── builder/      # Focused Resume Builder sub-components
│   └── templates/    # Diverse resume layout designs
├── auth/             # Authentication context and storage
└── hooks/            # Custom logic like useAutosave
```

## Security Features

- **Helmet.js**: Secured HTTP headers.
- **Express Rate Limit**: Prevention against brute-force and DDoS.
- **Sanitized Inputs**: Centralized data validation.
- **Centralized Error Handling**: Prevents sensitive data leakage in production.

---

##  Author
**Sourav** - [GitHub Profile](https://github.com/sourav)

## License
This project is licensed under the ISC License.
