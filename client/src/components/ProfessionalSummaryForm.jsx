import { Loader2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import api from '../configs/api';
import toast from 'react-hot-toast';


const ProfessionalSummaryForm = ({ data, onChange }) => {

  const[isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async()=>{
    try {
      setIsGenerating(true)
      const prompt = `enhance my proffesional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt})
      onChange(response.data.enhancedContent)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Summary</label>
        <button
        disabled={isGenerating}
        onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 uppercase tracking-wider"
          type="button"
        >
          {isGenerating ? (<Loader2 className='size-3 animate-spin'/>): (<Sparkles className="size-3" />)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="space-y-4">
        <textarea
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none bg-white text-sm leading-relaxed"
          placeholder="Write a compelling professional summary..."
        />
        <div className='bg-slate-50 p-4 rounded-xl border border-slate-100'>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-slate-700"> Tip:</strong> Focus on your top 2-3 achievements and the unique value you bring. Keep it under 4 sentences for maximum impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
