import { Plus, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';

const SkillsForm = ({ data, onChange }) => {
    const categories = [
        { key: 'languages', label: 'Programming Languages' },
        { key: 'frameworks', label: 'Frameworks/Libraries' },
        { key: 'tools', label: 'Tools/Platforms/Databases' },
        { key: 'general', label: 'Other/General Skills' },
    ];

    const [newSkills, setNewSkills] = useState({
        languages: '',
        frameworks: '',
        tools: '',
        general: '',
    });

    const addSkill = (category) => {
        const skill = newSkills[category].trim();
        if (skill && !data[category].includes(skill)) {
            onChange({
                ...data,
                [category]: [...data[category], skill]
            });
            setNewSkills({ ...newSkills, [category]: '' });
        }
    }

    const removeSkill = (category, indexToRemove) => {
        onChange({
            ...data,
            [category]: data[category].filter((_, index) => index !== indexToRemove)
        });
    }

    const handleKeyDown = (e, category) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(category);
        }
    }

    return (
        <div className="space-y-8">
            {categories.map((cat) => (
                <div key={cat.key} className="space-y-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        {cat.label}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder={`Add ${cat.label.toLowerCase()}...`}
                            className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 outline-none transition-colors'
                            onChange={(e) => setNewSkills({ ...newSkills, [cat.key]: e.target.value })}
                            value={newSkills[cat.key]}
                            onKeyDown={(e) => handleKeyDown(e, cat.key)}
                        />
                        <button
                            onClick={() => addSkill(cat.key)}
                            disabled={!newSkills[cat.key].trim()}
                            className='flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50'
                        >
                            <Plus className='w-4 h-4' />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {data[cat.key]?.map((skill, index) => (
                            <span key={index} className="flex items-center gap-1 px-3 py-1 bg-white text-indigo-700 border border-indigo-100 rounded-full text-sm font-medium shadow-sm">
                                {skill}
                                <button
                                    onClick={() => removeSkill(cat.key, index)}
                                    className="ml-1 hover:bg-indigo-50 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3 h-3 text-indigo-400" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            <div className='bg-indigo-50/50 p-4 rounded-xl border border-indigo-100'>
                <p className='text-xs text-indigo-800 leading-relaxed'>
                    <strong> sTip:</strong> Categorizing your skills helps recruiters and ATS systems quickly identify your core strengths.
                </p>
            </div>
        </div>
    );
}

export default SkillsForm;
