import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Briefcase, FileText, Folder, GraduationCap, Sparkles, User, BarChart3, Award
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import api from '../configs/api';
import toast from 'react-hot-toast';
import useAutosave from '../hooks/useAutosave';

// Modular Components
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderSidebar from '../components/builder/BuilderSidebar';
import BuilderFormArea from '../components/builder/BuilderFormArea';
import BuilderPreview from '../components/builder/BuilderPreview';

const SECTION_DEFINITIONS = {
  personal: { id: 'personal', name: 'Personal', icon: User },
  summary: { id: 'summary', name: 'Summary', icon: FileText },
  experience: { id: 'experience', name: 'Experience', icon: Briefcase },
  education: { id: 'education', name: 'Education', icon: GraduationCap },
  project: { id: 'project', name: 'Projects', icon: Folder },
  publications: { id: 'publications', name: 'Publications', icon: FileText },
  leadership: { id: 'leadership', name: 'Volunteering', icon: User },
  skills: { id: 'skills', name: 'Skills', icon: Sparkles },
  hobbies: { id: 'hobbies', name: 'Hobbies', icon: User },
  certifications: { id: 'certifications', name: 'Certifications', icon: Award },
  coverLetter: { id: 'coverLetter', name: 'Cover Letter', icon: FileText },
  analysis: { id: 'analysis', name: 'ATS Analysis', icon: BarChart3 },
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const location = useLocation();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: 'Untitled Resume',
    personal_info: { full_name: '', profession: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '' },
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    publications: [],
    leadership: [],
    skills: { languages: [], frameworks: [], tools: [], general: [] },
    hobbies: [],
    certifications: [],
    template: 'classic',
    accent_color: '#3B82F6',
    section_order: ['personal', 'summary', 'experience', 'education', 'project', 'publications', 'leadership', 'skills', 'hobbies', 'certifications'],
    public: false,
  });

  const [activeSectionId, setActiveSectionId] = useState('personal');
  const [zoom, setZoom] = useState(0.8);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (location.state?.section) {
      setActiveSectionId(location.state.section);
    }
  }, [location.state]);

  // Load Resume
  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get('/api/resumes/get/' + resumeId);
        if (data.resume) {
          const loadedSectionOrder = data.resume.section_order || ['personal', 'summary', 'experience', 'education', 'project', 'publications', 'leadership', 'skills', 'hobbies', 'certifications'];
          
          setResumeData({
            ...data.resume,
            section_order: loadedSectionOrder,
            personal_info: {
              full_name: '', profession: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '',
              ...data.resume.personal_info,
            },
            skills: data.resume.skills || { languages: [], frameworks: [], tools: [], general: [] },
            hobbies: data.resume.hobbies || [],
            publications: data.resume.publications || [],
            leadership: data.resume.leadership || [],
            certifications: data.resume.certifications || [],
          });
          document.title = data.resume.title;
          setLastSaved(new Date());
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load resume");
      }
    };
    loadResume();
  }, [resumeId]);

  // Save Logic
  const saveResume = useCallback(async (showToast = true) => {
    if (!resumeData.personal_info.full_name?.trim()) return;
    
    setIsSaving(true);
    let toastId;
    if (showToast) toastId = toast.loading("Saving...");

    try {
      const { data } = await api.put('/api/resumes/update', {
        resumeId,
        resumeData: resumeData
      });
      setResumeData(data.resume);
      setLastSaved(new Date());
      if (showToast) toast.success("Saved successfully!", { id: toastId });
    } catch (error) {
      console.error("Save error:", error);
      if (showToast) toast.error("Error saving resume", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  }, [resumeId, resumeData]);

  // Autosave
  useAutosave(() => {
    saveResume(false);
  }, 2000, [resumeData]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(resumeData.section_order);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setResumeData({ ...resumeData, section_order: items });
  };

  const changeResumeVisibility = async () => {
    try {
      const nextPublicStatus = !resumeData.public;
      await api.put('/api/resumes/update', {
        resumeId,
        resumeData: { public: nextPublicStatus }
      });
      setResumeData(prev => ({ ...prev, public: nextPublicStatus }));
      toast.success(nextPublicStatus ? "Resume is now public!" : "Resume is now private");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update visibility");
    }
  };

  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const downloadResume = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      toast.error("Could not find resume content");
      return;
    }

    const toastId = toast.loading("Generating PDF...");

    try {
      const images = element.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2, backgroundColor: '#ffffff', cacheBust: true });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const links = element.getElementsByTagName('a');
      const elementRect = element.getBoundingClientRect();
      const scaleX = pdfWidth / elementRect.width;
      const scaleY = pdfHeight / elementRect.height;

      Array.from(links).forEach(link => {
        const rect = link.getBoundingClientRect();
        const url = link.getAttribute('href');
        if (url && (url.startsWith('http') || url.startsWith('mailto:'))) {
          const x = (rect.left - elementRect.left) * scaleX;
          const y = (rect.top - elementRect.top) * scaleY;
          const w = rect.width * scaleX;
          const h = rect.height * scaleY;
          pdf.link(x, y, w, h, { url });
        }
      });

      pdf.save(`${resumeData.personal_info?.full_name || 'Resume'}.pdf`);
      toast.success("Downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      <BuilderHeader 
        title={resumeData.title}
        publicStatus={resumeData.public}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
        onVisibilityChange={changeResumeVisibility}
        onShare={handleShare}
        onTemplateChange={(template) => setResumeData(prev => ({ ...prev, template }))}
        onColorChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
        onSave={() => saveResume(true)}
        isSaving={isSaving}
      />

      <div className="flex-1 flex overflow-hidden">
        <BuilderSidebar 
          sectionOrder={resumeData.section_order}
          sectionDefinitions={SECTION_DEFINITIONS}
          activeSectionId={activeSectionId}
          onSectionClick={setActiveSectionId}
          onDragEnd={onDragEnd}
        />

        <BuilderFormArea 
          activeSectionId={activeSectionId}
          resumeData={resumeData}
          setResumeData={setResumeData}
          sectionDefinitions={SECTION_DEFINITIONS}
          onSave={() => saveResume(true)}
        />

        <BuilderPreview 
          resumeData={resumeData}
          zoom={zoom}
          onZoomChange={setZoom}
          onDownload={downloadResume}
        />
      </div>

      {/* Footer Status */}
      <footer className="h-6 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-4">
          <span>Words: {resumeData.professional_summary?.split(/\s+/).filter(Boolean).length || 0}</span>
          <span>Sections: {resumeData.section_order.length}</span>
        </div>
        <div>
          {isSaving ? 'Saving changes...' : lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 'Not saved yet'}
        </div>
      </footer>
    </div>
  );
};

export default ResumeBuilder;
