import React, { useState } from 'react';
import { Loader2, Sparkles, Copy, Download } from 'lucide-react';
import api from '../configs/api';
import toast from 'react-hot-toast';

const CoverLetterForm = ({ resumeData }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please provide a job description");
      return;
    }

    try {
      setIsGenerating(true);
      const { data } = await api.post('/api/ai/generate-cover-letter', {
        resumeData,
        jobDescription,
      });
      setGeneratedLetter(data.coverLetter);
      toast.success("Cover letter generated!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success("Copied to clipboard!");
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Cover_Letter.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
          <p className="text-sm text-gray-500">Paste the job description you're applying for</p>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
          placeholder="Paste job description here..."
        />
        <button
          onClick={generateCoverLetter}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 py-2.5  bg-indigo-600 hover:bg-indigo-700  text-white rounded-xl font-semibold transition-all disabled:opacity-50 shadow-sm"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isGenerating ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      {generatedLetter && (
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Generated Cover Letter</h3>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={downloadAsText}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Download as TXT"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            value={generatedLetter}
            onChange={(e) => setGeneratedLetter(e.target.value)}
            rows={12}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm font-serif leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};

export default CoverLetterForm;
