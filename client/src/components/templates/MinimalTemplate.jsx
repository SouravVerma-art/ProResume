import React from "react";

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const sectionOrder = data.section_order || ["personal", "summary", "experience", "education", "project", "skills", "hobbies", "certifications"];

    const renderSection = (id) => {
        switch (id) {
            case 'personal':
                return (
                    <header key="personal" className="mb-10 overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h1 className="text-4xl font-thin mb-4 tracking-wide break-words">
                                    {data.personal_info?.full_name || "Your Name"}
                                </h1>

                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                    {data.personal_info?.email && <span className="break-all">{data.personal_info.email}</span>}
                                    {data.personal_info?.phone && <span className="break-words">{data.personal_info.phone}</span>}
                                    {data.personal_info?.location && <span className="break-words">{data.personal_info.location}</span>}
                                    {data.personal_info?.linkedin && (
                                        <span className="break-all">{data.personal_info.linkedin}</span>
                                    )}
                                    {data.personal_info?.website && (
                                        <span className="break-all">{data.personal_info.website}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                );
            case 'summary':
                return data.professional_summary && (
                    <section key="summary" className="mb-10">
                        <p className=" text-gray-700 break-words">
                            {data.professional_summary}
                        </p>
                    </section>
                );
            case 'experience':
                return data.experience && data.experience.length > 0 && (
                    <section key="experience" className="mb-10">
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-medium break-words" style={{ color: accentColor }}>
                            Experience
                        </h2>

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-medium break-words">{exp.position}</h3>
                                        <span className="text-sm text-gray-500 shrink-0 ml-4">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2 break-words">{exp.company}</p>
                                    {exp.description && (
                                        <div className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'project':
                return data.project && data.project.length > 0 && (
                    <section key="project" className="mb-10">
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-medium break-words" style={{ color: accentColor }}>
                            Projects
                        </h2>

                        <div className="space-y-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-medium break-words">{proj.name}</h3>
                                        <div className="flex gap-3 shrink-0 ml-4">
                                            {proj.github && (
                                                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: accentColor }}>
                                                    GitHub
                                                </a>
                                            )}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: accentColor }}>
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 break-words">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                return data.education && data.education.length > 0 && (
                    <section key="education" className="mb-10">
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-medium break-words" style={{ color: accentColor }}>
                            Education
                        </h2>

                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div className="min-w-0">
                                        <h3 className="font-medium break-words">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-600 break-words">{edu.institution}</p>
                                        {edu.gpa && <p className="text-sm text-gray-500 break-words">GPA: {edu.gpa}</p>}
                                    </div>
                                    <span className="text-sm text-gray-500 shrink-0 ml-4">
                                        {formatDate(edu.graduation_date)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'skills': {
                const allSkillsMin = [];
                if (data.skills) {
                    if (data.skills.languages) allSkillsMin.push(...data.skills.languages);
                    if (data.skills.frameworks) allSkillsMin.push(...data.skills.frameworks);
                    if (data.skills.tools) allSkillsMin.push(...data.skills.tools);
                    if (data.skills.general) allSkillsMin.push(...data.skills.general);
                }
                return allSkillsMin.length > 0 && (
                    <section key="skills" className="mb-10">
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-medium break-words" style={{ color: accentColor }}>
                            Skills
                        </h2>

                        <div className="text-gray-700 break-words">
                            {allSkillsMin.join(" • ")}
                        </div>
                    </section>
                );
            }
            case 'hobbies':
                return data.hobbies && data.hobbies.length > 0 && (
                    <section key="hobbies" className="mb-10">
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-medium break-words" style={{ color: accentColor }}>
                            Hobbies
                        </h2>

                        <div className="text-gray-700 break-words">
                            {data.hobbies.join(" • ")}
                        </div>
                    </section>
                );
            case 'certifications':
                return data.certifications && data.certifications.length > 0 && (
                    <section key="certifications" className="mb-10">
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-medium break-words" style={{ color: accentColor }}>
                            Certifications
                        </h2>
                        <div className="space-y-4">
                            {data.certifications.map((cert, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-gray-900 break-words">
                                            {cert.link ? (
                                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: accentColor }}>
                                                    {cert.name}
                                                </a>
                                            ) : cert.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 break-words">{cert.issuer}</p>
                                    </div>
                                    <div className="text-sm text-gray-500 shrink-0 ml-4">{cert.date}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full p-10 bg-white text-gray-900 font-light">
            {sectionOrder.map(id => renderSection(id))}
        </div>
    );
}

export default MinimalTemplate;