import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Share2Icon } from 'lucide-react';
import TemplateSelector from '../TemplateSelector';
import ColorPicker from '../ColorPicker';

const BuilderHeader = ({ 
    title, 
    publicStatus, 
    template, 
    accentColor, 
    onVisibilityChange, 
    onShare, 
    onTemplateChange, 
    onColorChange, 
    onSave,
    isSaving
}) => {
    return (
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-50">
            <div className="flex items-center gap-6">
                <Link to="/app" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
                    <ArrowLeftIcon size={20} />
                </Link>
                <div className="h-6 w-px bg-slate-200"></div>
                <h1 className="font-bold text-slate-900 truncate max-w-[200px]">{title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                    <button
                        onClick={onVisibilityChange}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                            publicStatus 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}
                    >
                        {publicStatus ? 'Public' : 'Private'}
                    </button>
                    {publicStatus && (
                        <button
                            onClick={onShare}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                            title="Share Link"
                        >
                            <Share2Icon size={18} />
                        </button>
                    )}
                </div>
                
                <div className="flex items-center gap-4">
                    <TemplateSelector
                        selectedTemplate={template}
                        onChange={onTemplateChange}
                    />
                    <ColorPicker
                        slectedColor={accentColor}
                        onChange={onColorChange}
                    />
                </div>

                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </header>
    );
};

export default BuilderHeader;
