import React from 'react';
import { DownloadIcon } from 'lucide-react';
import ResumePreview from '../ResumePreview';

const BuilderPreview = ({ 
    resumeData, 
    zoom, 
    onZoomChange, 
    onDownload 
}) => {
    return (
        <section className="flex-1 bg-slate-100 flex flex-col overflow-hidden relative">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-3 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Zoom</span>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="1.5" 
                        step="0.1" 
                        value={zoom} 
                        onChange={(e) => onZoomChange(parseFloat(e.target.value))} 
                        className="w-20 accent-indigo-600" 
                    />
                </div>
                <button 
                    onClick={onDownload} 
                    className="size-10 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
                >
                    <DownloadIcon size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-auto p-12 flex justify-center custom-scrollbar">
                <div className="origin-top transition-transform duration-300 shadow-2xl" style={{ transform: `scale(${zoom})` }}>
                    <ResumePreview 
                        data={resumeData} 
                        template={resumeData.template} 
                        accentColor={resumeData.accent_color} 
                    />
                </div>
            </div>
        </section>
    );
};

export default BuilderPreview;
