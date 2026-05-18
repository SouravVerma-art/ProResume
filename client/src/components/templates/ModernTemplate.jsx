import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
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
					<header key="personal" className="p-8 text-white overflow-hidden" style={{ backgroundColor: accentColor }}>
						<div className="flex gap-6 items-center">
							<div className="flex-1">
								<h1 className="text-4xl font-light mb-3 break-words">
									{data.personal_info?.full_name || "Your Name"}
								</h1>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
									{data.personal_info?.email && (
										<div className="flex items-center gap-2 min-w-0">
											<Mail className="size-4 shrink-0" />
											<span className="break-all">{data.personal_info.email}</span>
										</div>
									)}
									{data.personal_info?.phone && (
										<div className="flex items-center gap-2 min-w-0">
											<Phone className="size-4 shrink-0" />
											<span className="break-words">{data.personal_info.phone}</span>
										</div>
									)}
									{data.personal_info?.location && (
										<div className="flex items-center gap-2 min-w-0">
											<MapPin className="size-4 shrink-0" />
											<span className="break-words">{data.personal_info.location}</span>
										</div>
									)}
									{data.personal_info?.linkedin && (
										<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2 min-w-0">
											<Linkedin className="size-4 shrink-0" />
											<span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
										</a>
									)}
									{data.personal_info?.website && (
										<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-2 min-w-0">
											<Globe className="size-4 shrink-0" />
											<span className="break-all text-xs">{data.personal_info.website.split("https://")[1] ? data.personal_info.website.split("https://")[1] : data.personal_info.website}</span>
										</a>
									)}
								</div>
							</div>
						</div>
					</header>
				);
			case 'summary':
				return data.professional_summary && (
					<section key="summary" className="mb-8 p-8 pb-0">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 break-words">
							Professional Summary
						</h2>
						<p className="text-gray-700 break-words">{data.professional_summary}</p>
					</section>
				);
			case 'experience':
				return data.experience && data.experience.length > 0 && (
					<section key="experience" className="mb-8 p-8 py-0">
						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200 break-words">
							Experience
						</h2>

						<div className="space-y-6">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200">

									<div className="flex justify-between items-start mb-2">
										<div className="min-w-0">
											<h3 className="text-xl font-medium text-gray-900 break-words">{exp.position}</h3>
											<p className="font-medium break-words" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded shrink-0 ml-4">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line break-words">
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
					<section key="project" className="mb-8 p-8 py-0">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 break-words">
							Projects
						</h2>

						<div className="space-y-6">
							{data.project.map((p, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
									<div className="flex justify-between items-start mb-1">
										<div className="min-w-0">
											<h3 className="text-lg font-medium text-gray-900 break-words">{p.name}</h3>
										</div>
										<div className="flex gap-3 shrink-0 ml-4">
											{p.github && (
												<a href={p.github} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: accentColor }}>
													GitHub
												</a>
											)}
											{p.link && (
												<a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: accentColor }}>
													Live Demo
												</a>
											)}
										</div>
									</div>
									{p.description && (
										<div className="text-gray-700 leading-relaxed text-sm mt-2 break-words">
											{p.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				);
			case 'education':
				return data.education && data.education.length > 0 && (
					<section key="education" className="mb-8 p-8 py-0">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 break-words">
							Education
						</h2>
						<div className="space-y-4">
							{data.education.map((edu, index) => (
								<div key={index}>
									<h3 className="font-semibold text-gray-900 break-words">
										{edu.degree} {edu.field && `in ${edu.field}`}
									</h3>
									<p className="break-words" style={{ color: accentColor }}>{edu.institution}</p>
									<div className="flex justify-between items-center text-sm text-gray-600">
										<span>{formatDate(edu.graduation_date)}</span>
										{edu.gpa && <span>GPA: {edu.gpa}</span>}
									</div>
								</div>
							))}
						</div>
					</section>
				);
			case 'skills': {
				const allSkillsMod = [];
				if (data.skills) {
					if (data.skills.languages) allSkillsMod.push(...data.skills.languages);
					if (data.skills.frameworks) allSkillsMod.push(...data.skills.frameworks);
					if (data.skills.tools) allSkillsMod.push(...data.skills.tools);
					if (data.skills.general) allSkillsMod.push(...data.skills.general);
				}
				return allSkillsMod.length > 0 && (
					<section key="skills" className="mb-8 p-8 pt-0">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 break-words">
							Skills
						</h2>
						<div className="flex flex-wrap gap-2">
							{allSkillsMod.map((skill, index) => (
								<span
									key={index}
									className="px-3 py-1 text-sm text-white rounded-full break-words"
									style={{ backgroundColor: accentColor }}
								>
									{skill}
								</span>
							))}
						</div>
					</section>
				);
			}
			case 'hobbies':
				return data.hobbies && data.hobbies.length > 0 && (
					<section key="hobbies" className="mb-8 p-8 pt-0">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 break-words">
							Hobbies
						</h2>
						<div className="flex flex-wrap gap-2">
							{data.hobbies.map((hobby, index) => (
								<span
									key={index}
									className="px-3 py-1 text-sm text-white rounded-full break-words"
									style={{ backgroundColor: accentColor }}
								>
									{hobby}
								</span>
							))}
						</div>
					</section>
				);
			case 'certifications':
				return data.certifications && data.certifications.length > 0 && (
					<section key="certifications" className="mb-8 p-8 pt-0">
						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200 break-words">
							Certifications
						</h2>
						<div className="space-y-4">
							{data.certifications.map((cert, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
									<div className="flex justify-between items-start">
										<div className="min-w-0">
											<h3 className="text-lg font-medium text-gray-900 break-words">
												{cert.link ? (
													<a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: accentColor }}>
														{cert.name}
													</a>
												) : cert.name}
											</h3>
											<p className="text-sm text-gray-600">{cert.issuer}</p>
										</div>
										<div className="text-sm text-gray-500 shrink-0 ml-4">
											{cert.date}
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				);
			default:
				return null;
		}
	}

	return (
		<div className="w-full bg-white text-gray-800">
			{sectionOrder.map(id => renderSection(id))}
		</div>
	);
}

export default ModernTemplate;