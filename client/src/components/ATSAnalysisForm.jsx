import React, { useState } from 'react';
import { Loader2, Search, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ATSAnalysisForm = ({ resumeData }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please provide a job description");
      return;
    }

    try {
      setIsAnalyzing(true);
      const { data } = await api.post('/api/ai/score-resume', {
        resumeData,
        jobDescription,
      });
      setAnalysis(data);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to analyze resume");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Job Description</h3>
          <p className="text-xs text-slate-500 mt-1">Paste the target job description to see how well your resume matches.</p>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none text-sm bg-white"
          placeholder="Paste job description here..."
        />
        <button
          onClick={analyzeResume}
          disabled={isAnalyzing}
          className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-sm"
        >
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {isAnalyzing ? "Analyzing Resume..." : "Analyze Match"}
        </button>
      </div>

      {analysis && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={263.8}
                  strokeDashoffset={263.8 - (263.8 * analysis.score) / 100}
                  className={`${
                    analysis.score >= 80 ? 'text-emerald-500' : analysis.score >= 50 ? 'text-amber-500' : 'text-rose-500'
                  } transition-all duration-1000 ease-out`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-800">{analysis.score}%</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Match</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Matching Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matching_keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-white text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-100">
                    {kw}
                  </span>
                ))}
                {analysis.matching_keywords.length === 0 && <span className="text-xs text-slate-400 italic">No matches found</span>}
              </div>
            </div>

            <div className="p-5 bg-rose-50/50 rounded-xl border border-rose-100">
              <h4 className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-widest mb-3">
                <XCircle className="w-3.5 h-3.5" />
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-white text-rose-700 text-[10px] font-bold rounded-lg border border-rose-100">
                    {kw}
                  </span>
                ))}
                {analysis.missing_keywords.length === 0 && <span className="text-xs text-slate-400 italic">No missing keywords!</span>}
              </div>
            </div>

            <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h4 className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-widest mb-3">
                <Lightbulb className="w-3.5 h-3.5" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="text-xs text-slate-600 flex gap-2">
                    <span className="shrink-0 text-indigo-500 font-bold">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSAnalysisForm;
