import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import api from '../configs/api';
import { ArrowLeftIcon, EyeOffIcon, DownloadIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get('/api/resumes/public/' + resumeId);
        setResumeData(data.resume);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      toast.error("Could not find resume content");
      return;
    }

    const toastId = toast.loading("Generating PDF...");

    try {
      // Ensure all images are loaded before capture
      const images = element.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      const dataUrl = await toPng(element, { 
        quality: 1, 
        pixelRatio: 2, 
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personal_info?.full_name || 'Resume'}.pdf`);

      toast.success("Downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. Please try again.", { id: toastId });
    }
  };

  if (isLoading) return <Loader />;

  return resumeData ? (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 flex items-center justify-center p-6 sm:p-12">
      {/* Floating Action Button */}
      <button
        onClick={handleDownload}
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl hover:bg-indigo-600 transition-all active:scale-95"
      >
        <DownloadIcon className="size-5" />
        <span className="font-bold text-sm tracking-wide">Download PDF</span>
      </button>

      {/* Aurora Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-aurora-1"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-100/30 rounded-full blur-[100px] animate-aurora-2"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden">
            <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                classes="bg-white"
            />
        </div>
        
        <p className="mt-12 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
           Verified by ProResume AI
        </p>
      </div>
    </div>
  ) : (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-slate-50">
       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="size-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
           <EyeOffIcon className="size-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Confidential Profile.</h2>
        <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
           This resume is currently set to private or does not exist. Please contact the owner for access.
        </p>
        <Link
            to="/"
            className="btn-primary inline-flex items-center gap-3 py-4 px-10 text-xs uppercase tracking-widest"
        >
            <ArrowLeftIcon className="size-4" />
            Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Preview;
