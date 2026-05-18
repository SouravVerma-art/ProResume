import React from "react";

const PdfTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!year || !month) return dateStr;
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const SectionHeading = ({ title }) => (
    <div style={{ marginBottom: "4px", marginTop: "8px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          margin: 0,
          fontFamily: '"Times New Roman", serif',
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h2>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid black",
          marginTop: "1px",
          marginBottom: "4px",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        padding: "32px 48px",
        background: "#fff",
        color: "#000",
        fontFamily: '"Times New Roman", serif',
        fontSize: "11px",
        lineHeight: "1.3",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "12px", textAlign: "center" }}>
        <h1
          style={{
            margin: "0 0 4px 0",
            fontSize: "22px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {data.personal_info?.full_name}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0 10px",
            fontSize: "11px",
          }}
        >
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>| {data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>| {data.personal_info.location}</span>}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "2px",
            fontSize: "11px",
          }}
        >
          {data.personal_info?.linkedin && (
            <a href={data.personal_info.linkedin} style={{ color: "#000", textDecoration: "none" }}>
              LinkedIn
            </a>
          )}
          {data.personal_info?.github && (
            <a href={data.personal_info.github} style={{ color: "#000", textDecoration: "none" }}>
              | GitHub
            </a>
          )}
          {data.personal_info?.website && (
            <a href={data.personal_info.website} style={{ color: "#000", textDecoration: "none" }}>
              | Portfolio
            </a>
          )}
        </div>
      </div>

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section>
          <SectionHeading title="Education" />
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyBetween: "space-between", fontWeight: "bold" }}>
                <span style={{ flex: 1 }}>{edu.institution}</span>
                <span style={{ whiteSpace: "nowrap" }}>{edu.location}</span>
              </div>
              <div style={{ display: "flex", justifyBetween: "space-between", fontStyle: "italic" }}>
                <span style={{ flex: 1 }}>
                  {edu.degree}{edu.field && `, ${edu.field}`}
                  {edu.gpa && <span style={{ fontStyle: "normal" }}> (CGPA: {edu.gpa})</span>}
                </span>
                <span style={{ whiteSpace: "nowrap", fontStyle: "normal" }}>
                   {edu.graduation_date}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section>
          <SectionHeading title="Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", fontWeight: "bold" }}>
                <span style={{ flex: 1 }}>{exp.company}</span>
                <span style={{ whiteSpace: "nowrap" }}>
                  {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </span>
              </div>
              <div style={{ fontStyle: "italic", marginBottom: "2px" }}>{exp.position}</div>
              
              {exp.description && (
                <ul style={{ margin: "0 0 0 16px", padding: 0, listStyleType: "disc" }}>
                  {exp.description.split("\n").filter(Boolean).map((line, idx) => (
                    <li key={idx} style={{ marginBottom: "1px" }}>{line}</li>
                  ))}
                  {exp.impact && (
                    <li style={{ fontWeight: "bold" }}>Impact: {exp.impact}</li>
                  )}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.project?.length > 0 && (
        <section>
          <SectionHeading title="Projects" />
          {data.project.map((proj, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", fontWeight: "bold" }}>
                <span style={{ flex: 1 }}>
                  {proj.name}
                  <div style={{ display: "inline-flex", gap: "8px", marginLeft: "8px" }}>
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "normal", fontSize: "10px", color: "#444", textDecoration: "underline" }}>
                        [GitHub]
                      </a>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "normal", fontSize: "10px", color: "#444", textDecoration: "underline" }}>
                        [Live Demo]
                      </a>
                    )}
                  </div>
                </span>
                <span style={{ whiteSpace: "nowrap" }}>{proj.date}</span>
              </div>
              {proj.tech && <div style={{ fontSize: "10px", color: "#444", marginBottom: "2px" }}>Tech Stack: {proj.tech}</div>}
              <div style={{ marginLeft: "4px" }}>{proj.description}</div>
              {proj.performance && <div style={{ marginLeft: "4px", fontStyle: "italic", marginTop: "1px" }}>Result: {proj.performance}</div>}
            </div>
          ))}
        </section>
      )}

      {/* PUBLICATIONS */}
      {data.publications?.length > 0 && (
        <section>
          <SectionHeading title="Publications" />
          {data.publications.map((pub, i) => (
            <div key={i} style={{ marginBottom: "4px", display: "flex" }}>
              <span style={{ flex: 1 }}>
                <strong>{pub.title}</strong>, {pub.publisher}
              </span>
              <span style={{ whiteSpace: "nowrap" }}>{pub.date}</span>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills && (data.skills.languages?.length > 0 || data.skills.frameworks?.length > 0 || data.skills.tools?.length > 0 || data.skills.general?.length > 0) && (
        <section>
          <SectionHeading title="Technical Skills" />
          <div style={{ spaceY: "2px" }}>
            {data.skills.languages?.length > 0 && <div><strong>Languages:</strong> {data.skills.languages.join(", ")}</div>}
            {data.skills.frameworks?.length > 0 && <div><strong>Frameworks/Libraries:</strong> {data.skills.frameworks.join(", ")}</div>}
            {data.skills.tools?.length > 0 && <div><strong>Tools/Databases:</strong> {data.skills.tools.join(", ")}</div>}
            {data.skills.general?.length > 0 && <div><strong>Other Skills:</strong> {data.skills.general.join(", ")}</div>}
          </div>
        </section>
      )}

      {/* HOBBIES */}
      {data.hobbies?.length > 0 && (
        <section style={{ marginBottom: "8px" }}>
          <SectionHeading title="Hobbies" />
          <div style={{ marginLeft: "4px" }}>
            {data.hobbies.join(", ")}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <section style={{ marginBottom: "8px" }}>
          <SectionHeading title="Certifications" />
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: "4px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ flex: 1 }}>
                <strong>
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>
                      {cert.name}
                    </a>
                  ) : cert.name}
                </strong>, {cert.issuer}
              </span>
              <span style={{ whiteSpace: "nowrap", marginLeft: "10px" }}>{cert.date}</span>
            </div>
          ))}
        </section>
      )}

      {/* LEADERSHIP */}
      {data.leadership?.length > 0 && (
        <section>
          <SectionHeading title="Volunteering & Leadership" />
          {data.leadership.map((item, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", fontWeight: "bold" }}>
                <span style={{ flex: 1 }}>{item.role}, {item.organization}</span>
                <span style={{ whiteSpace: "nowrap" }}>{item.date}</span>
              </div>
              <div style={{ marginLeft: "4px" }}>{item.description}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default PdfTemplate;
