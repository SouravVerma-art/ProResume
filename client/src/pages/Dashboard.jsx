import {
  EyeIcon,
  FileText,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  Sparkles,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
  BarChart3,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import api from '../configs/api';
import useAuth from "../auth/useAuth";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const { user } = useAuth();
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/resumes');
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/api/resumes/create', { title });
      setAllResumes(prev => [...prev, data.resume]);
      setTitle('');
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resumeFile) {
      toast.error("Please select a resume file");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("title", title);

      const { data } = await api.post(
        '/api/ai/upload-resume',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setTitle('');
      setResumeFile(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResume = async (id, e) => {
    e.stopPropagation();
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this resume?');
      if (confirmDelete) {
        const { data } = await api.delete(`/api/resumes/delete/${id}`);
        setAllResumes(prev => prev.filter(resume => resume._id !== id));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const editResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } }
      );
      setAllResumes(prev => prev.map(resume => resume._id === editResumeId ? { ...resume, title } : resume));
      setTitle('');
      setEditResumeId(null);
      setShowCreateResume(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50/50">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              {user?.name ? `${user.name.split(' ')[0]}'s Workspace` : 'Your Workspace'}
            </h1>
            <p className="mt-2 text-slate-500 max-w-xl font-medium">
              Manage your resumes and track your career growth.
            </p>
          </div>

          <div className="glass-panel-dark p-6 rounded-3xl flex items-center gap-10 px-10 shadow-xl">
            <div className="flex flex-col items-center">
              <p className="text-slate-400 text-[10px] font-bold mb-1 uppercase tracking-widest">Resumes</p>
              <p className="text-2xl font-bold text-white">{allResumes.length}</p>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <p className="text-slate-400 text-[10px] font-bold mb-1 uppercase tracking-widest">Total Views</p>
              <p className="text-2xl font-bold text-white">
                {allResumes.reduce((acc, curr) => acc + (curr.views || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <button
            onClick={() => setShowCreateResume(true)}
            className="bento-card flex flex-col items-center justify-center gap-4 group"
          >
            <div className="size-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <PlusIcon className="size-7 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900">Create New</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From scratch</p>
            </div>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="bento-card flex flex-col items-center justify-center gap-4 group"
          >
            <div className="size-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloudIcon className="size-7 text-indigo-600" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900">Import Resume</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Assisted</p>
            </div>
          </button>

          <div className="lg:col-span-2 bento-card flex items-center gap-8 relative overflow-hidden group">
             <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">ATS Optimization</h3>
                <p className="text-slate-500 text-sm">Analyze your resume against any job description.</p>
                <button 
                  onClick={() => {
                    if (allResumes.length > 0) {
                      navigate(`/app/builder/${allResumes[0]._id}`, { state: { section: 'analysis' } });
                    } else {
                      setShowCreateResume(true);
                      toast.error("Please create a resume first to use ATS Analysis.");
                    }
                  }}
                  className="mt-3 text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:translate-x-1 transition-transform"
                >
                  Try ATS Analysis →
                </button>
             </div>
             <div className="size-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <BarChart3 className="size-8 text-indigo-600" />
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-10">
          <h2 className="text-xl font-bold text-slate-900 shrink-0">Recent Resumes</h2>
          <div className="h-px bg-slate-200 flex-1 opacity-50"></div>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allResumes.map((resume, index) => {
            const basecolor = colors[index % colors.length];
            return (
              <div
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="bento-card group flex flex-col p-6 cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: basecolor }}
                ></div>

                <div className="flex items-start justify-between mb-8">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: basecolor + "10" }}
                  >
                    <FileText className="size-6" style={{ color: basecolor }} />
                  </div>

                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                        setShowCreateResume(true);
                      }}
                      className="size-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600"
                    >
                      <PencilIcon className="size-3.5" />
                    </button>
                    <button
                      onClick={(e) => deleteResume(resume._id, e)}
                      className="size-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500"
                    >
                      <TrashIcon className="size-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 truncate mb-1">
                  {resume.title || "Untitled Resume"}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Updated {resume?.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "—"}
                </p>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {resume.public ? (
                      <div className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[8px] font-bold uppercase tracking-wider border border-emerald-100">Live</div>
                    ) : (
                      <div className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[8px] font-bold uppercase tracking-wider border border-slate-100">Draft</div>
                    )}
                  </div>
                  {resume.public && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <EyeIcon className="size-3" />
                      <span className="text-[10px] font-bold text-slate-600">{resume.views || 0}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Popups */}
        {(showCreateResume || showUploadResume) && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
             {showCreateResume && (
                <form
                  onSubmit={(e) => {
                    editResumeId ? editResume(e) : createResume(e);
                  }}
                  className="glass-panel w-full max-w-md p-10 bg-white/95 rounded-3xl shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{editResumeId ? "Rename" : "New Resume"}</h2>
                  <p className="text-sm text-slate-500 mb-8">Give your resume a title.</p>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="e.g. Frontend Engineer"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none rounded-xl transition-all font-bold text-slate-900 mb-8"
                    required
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setShowCreateResume(false); setEditResumeId(null); setTitle(""); }}
                      className="flex-1 px-4 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 rounded-xl"
                    >Cancel</button>
                    <button className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/20">
                      {editResumeId ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
             )}

             {showUploadResume && (
                <form
                  onSubmit={uploadResume}
                  className="glass-panel w-full max-w-md p-10 bg-white/95 rounded-3xl shadow-2xl"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">AI Import</h2>
                  <p className="text-sm text-slate-500 mb-8">Parse your existing resume with AI.</p>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Resume Title"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none rounded-xl transition-all font-bold text-slate-900 mb-6"
                    required
                  />
                  <label
                    htmlFor="resume-input"
                    className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer transition-all mb-8"
                  >
                    {resumeFile ? (
                      <p className="text-slate-900 font-bold text-center break-all">{resumeFile.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-8 text-slate-300" />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select .txt or .pdf</p>
                      </>
                    )}
                  </label>
                  <input id="resume-input" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.pdf" />
                  <button
                    disabled={isLoading}
                    className="w-full py-4 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && <LoaderCircleIcon className="animate-spin size-4" />}
                    {isLoading ? 'Processing...' : 'Upload & Build'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowUploadResume(false); setResumeFile(null); setTitle(""); }}
                    className="w-full mt-3 py-3 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600"
                  >Cancel</button>
                </form>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
