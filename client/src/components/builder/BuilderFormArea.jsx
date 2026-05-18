import React from 'react';
import { Save } from 'lucide-react';
import PersonalInfoForm from '../PersonalInfoForm';
import ProfessionalSummaryForm from '../ProfessionalSummaryForm';
import ExperienceForm from '../ExperienceForm';
import EducationForm from '../EducationForm';
import ProjectForm from '../ProjectForm';
import SkillsForm from '../SkillsForm';
import HobbiesForm from '../HobbiesForm';
import CertificationsForm from '../CertificationsForm';
import PublicationsForm from '../PublicationsForm';
import LeadershipForm from '../LeadershipForm';
import CoverLetterForm from '../CoverLetterForm';
import ATSAnalysisForm from '../ATSAnalysisForm';

const BuilderFormArea = ({ 
    activeSectionId, 
    resumeData, 
    setResumeData, 
    sectionDefinitions, 
    onSave 
}) => {
    const activeSection = sectionDefinitions[activeSectionId];

    const renderForm = () => {
        switch (activeSectionId) {
            case 'personal':
                return <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} />;
            case 'summary':
                return <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} />;
            case 'experience':
                return <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />;
            case 'education':
                return <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />;
            case 'project':
                return <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />;
            case 'skills':
                return <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />;
            case 'hobbies':
                return <HobbiesForm data={resumeData.hobbies} onChange={(data) => setResumeData(prev => ({ ...prev, hobbies: data }))} />;
            case 'certifications':
                return <CertificationsForm data={resumeData.certifications} onChange={(data) => setResumeData(prev => ({ ...prev, certifications: data }))} />;
            case 'publications':
                return <PublicationsForm data={resumeData.publications} onChange={(data) => setResumeData(prev => ({ ...prev, publications: data }))} />;
            case 'leadership':
                return <LeadershipForm data={resumeData.leadership} onChange={(data) => setResumeData(prev => ({ ...prev, leadership: data }))} />;
            case 'coverLetter':
                return <CoverLetterForm resumeData={resumeData} />;
            case 'analysis':
                return <ATSAnalysisForm resumeData={resumeData} />;
            default:
                return null;
        }
    };

    return (
        <main className="w-[450px] border-r border-slate-200 bg-white flex flex-col overflow-hidden shrink-0">
            <div className="p-8 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{activeSection.name}</h2>
                <p className="text-sm text-slate-500 mt-1">
                    {activeSectionId === 'analysis' ? 'Optimize for ATS systems' : `Edit your ${activeSection.name.toLowerCase()} details.`}
                </p>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                {renderForm()}
            </div>

            {activeSectionId !== 'analysis' && activeSectionId !== 'coverLetter' && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                    <button
                        onClick={onSave}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        Save {activeSection.name} Details
                    </button>
                </div>
            )}
        </main>
    );
};

export default BuilderFormArea;
