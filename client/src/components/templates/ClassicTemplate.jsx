import React from "react";

const ClassicTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const sectionOrder = data.section_order || ["personal", "summary", "experience", "education", "project", "skills", "publications", "leadership", "hobbies", "certifications"];

  const renderSection = (id) => {
    switch (id) {
      case 'personal':
        return (
          <header key="personal" className="flex justify-between items-start mb-6 border-b border-gray-300 pb-3 overflow-hidden">
            <div className="flex gap-4 max-w-[65%]">
              <div className="min-w-0">
                <h1 className="text-[24px] font-bold tracking-wide break-words">
                  {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                  <p className="text-[13px] text-gray-600 mt-1 break-words">{data.personal_info.profession}</p>
                )}
                <div className="text-[13px] text-gray-700 mt-2 flex flex-wrap gap-3">
                  {data.personal_info?.linkedin && (
                    <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 break-all">
                      LinkedIn
                    </a>
                  )}
                  {data.personal_info?.website && (
                    <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-800 break-all">
                      {data.personal_info.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right text-[13px] text-gray-700 space-y-1 max-w-[35%] break-words">
              {data.personal_info?.email && <p className="break-all">{data.personal_info.email}</p>}
              {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
              {data.personal_info?.location && <p className="break-words">{data.personal_info.location}</p>}
            </div>
          </header>
        );
      case 'summary':
        return data.professional_summary && (
          <section key="summary" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Summary</h2>
            <p className="text-[13px] text-gray-700 leading-relaxed ml-2">{data.professional_summary}</p>
          </section>
        );
      case 'experience':
        return data.experience?.length > 0 && (
          <section key="experience" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="ml-2 mb-4">
                <div className="flex justify-between items-start">
                  <p className="text-[14px] font-semibold">
                    {exp.company}
                    {exp.position && <span className="text-gray-700 font-normal"> — {exp.position}</span>}
                  </p>
                  <p className="text-[13px] text-gray-500 italic shrink-0 ml-4">
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>
                {exp.description && (
                  <ul className="text-[13px] text-gray-800 ml-4 list-disc list-inside leading-snug mt-1">
                    {exp.description.split("\n").filter(Boolean).map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        );
      case 'project':
        return data.project?.length > 0 && (
          <section key="project" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Projects</h2>
            {data.project.map((proj, i) => (
              <div key={i} className="ml-2 mb-3">
                <div className="flex justify-between items-start">
                  <p className="text-[14px] font-semibold">{proj.name}</p>
                  <div className="flex gap-3">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-700 hover:underline">
                        GitHub
                      </a>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-700 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-[13px] text-gray-800 ml-2 leading-snug">{proj.description}</p>
                )}
              </div>
            ))}
          </section>
        );
      case 'education':
        return data.education?.length > 0 && (
          <section key="education" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="ml-2 mb-3 flex justify-between items-start">
                <div>
                  <p className="text-[14px] font-semibold">{edu.institution}</p>
                  <p className="text-[13px] text-gray-800">
                    {edu.degree}{edu.field && ` — ${edu.field}`}{edu.gpa && `; GPA: ${edu.gpa}`}
                  </p>
                </div>
                <p className="text-[13px] text-gray-500 italic shrink-0 ml-4">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </section>
        );
      case 'skills':
        const allSkills = [];
        if (data.skills) {
          if (data.skills.languages) allSkills.push(...data.skills.languages);
          if (data.skills.frameworks) allSkills.push(...data.skills.frameworks);
          if (data.skills.tools) allSkills.push(...data.skills.tools);
          if (data.skills.general) allSkills.push(...data.skills.general);
        }
        return allSkills.length > 0 && (
          <section key="skills" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-2 ml-2">
              {allSkills.map((skill, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 text-[13px] px-2 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        );
      case 'publications':
        return data.publications?.length > 0 && (
          <section key="publications" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Publications</h2>
            {data.publications.map((pub, i) => (
              <div key={i} className="ml-2 mb-2 flex justify-between items-start">
                <div>
                  <p className="text-[14px] font-semibold">{pub.title}</p>
                  <p className="text-[13px] text-gray-700">{pub.publisher}</p>
                </div>
                <p className="text-[13px] text-gray-500 italic shrink-0 ml-4">{pub.date}</p>
              </div>
            ))}
          </section>
        );
      case 'leadership':
        return data.leadership?.length > 0 && (
          <section key="leadership" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Volunteering & Leadership</h2>
            {data.leadership.map((item, i) => (
              <div key={i} className="ml-2 mb-3">
                <div className="flex justify-between items-start">
                  <p className="text-[14px] font-semibold">{item.role}</p>
                  <p className="text-[13px] text-gray-500 italic shrink-0 ml-4">{item.date}</p>
                </div>
                <p className="text-[13px] text-gray-700 italic">{item.organization}</p>
                {item.description && (
                  <p className="text-[13px] text-gray-800 ml-2 mt-1 leading-snug">{item.description}</p>
                )}
              </div>
            ))}
          </section>
        );
      case 'hobbies':
        return data.hobbies?.length > 0 && (
          <section key="hobbies" className="border-b border-gray-200 mb-6 pb-3">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Hobbies</h2>
            <p className="text-[13px] text-gray-700 leading-relaxed ml-2">
              {data.hobbies.join(", ")}
            </p>
          </section>
        );
      case 'certifications':
        return data.certifications?.length > 0 && (
          <section key="certifications">
            <h2 className="text-[16px] font-bold uppercase mb-2 text-gray-800">Certifications</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="ml-2 mb-2 flex justify-between items-start">
                <div>
                  <p className="text-[14px] font-semibold">
                    {cert.link ? (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">
                        {cert.name}
                      </a>
                    ) : cert.name}
                  </p>
                  <p className="text-[13px] text-gray-700">{cert.issuer}</p>
                </div>
                <p className="text-[13px] text-gray-500 italic shrink-0 ml-4">{cert.date}</p>
              </div>
            ))}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-10 bg-white text-black font-serif text-[14px] leading-relaxed">
      {sectionOrder.map(id => renderSection(id))}
    </div>
  );
};

export default ClassicTemplate;

