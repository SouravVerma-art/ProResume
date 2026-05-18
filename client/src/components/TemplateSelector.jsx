import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A traditional resume layout with a clean and professional design."
        },
        {
            id: "modern",
            name: "Modern",
            preview: "A contemporary resume style with bold headings and a sleek look."
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "A simple and elegant resume format with plenty of white space."
        },
        {
            id: "regular",
            name: "Regular",
            preview: "A regular resume layout with a sidebar and dark theme."
        },
    ];

    return (
        <div className='relative'>
            <button
                className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'
                onClick={() => setIsOpen(!isOpen)}
            >
                <Layout size={14} />
                <span className='max-sm:hidden'>Template</span>
            </button>

            {isOpen && (
                <div className='absolute top-full right-0 w-64 p-3 mt-2 space-y-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[1000]'>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Select Template</h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => { onChange(template.id); setIsOpen(false); }}
                                className={`group flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-all ${
                                    selectedTemplate === template.id
                                        ? 'border-indigo-600 bg-indigo-50/50'
                                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                <div>
                                    <h4 className={`text-sm font-bold ${selectedTemplate === template.id ? 'text-indigo-600' : 'text-slate-900'}`}>
                                        {template.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{template.preview}</p>
                                </div>
                                {selectedTemplate === template.id && (
                                    <div className="size-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-md shrink-0 ml-2">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;
