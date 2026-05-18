import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({ data, onChange }) => {

      const[generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            impact: '',
            is_current: false,
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateExperience = (index, field, value) => {
        const updated = data.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        onChange(updated);
    };

    // Helper to safely format date values for <input type="month">
    const formatMonthValue = (value) => {
        if (!value) return '';
        // Ensure only valid YYYY-MM format is used
        const match = value.match(/^(\d{4})-(\d{2})/);
        return match ? value : '';
    };

      const generateDescription = async(index)=>{
        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`

        try {
             const {data} = await api.post('/api/ai/enhance-job-desc',  {userContent: prompt})
             updateExperience(index, "description", data.enhancedContent)
        } catch (error) {
             toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setGeneratingIndex(-1)
    }
      }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                    type="button"
                >
                    <Plus className="size-4" />
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No experiences added yet.</p>
                    <p>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((experience, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">
                                    Experience #{index + 1}
                                </h4>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removeExperience(index)}
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Inputs Section */}
                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={experience.company}
                                    onChange={(e) =>
                                        updateExperience(index, 'company', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Company Name"
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={experience.position}
                                    onChange={(e) =>
                                        updateExperience(index, 'position', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Job Title"
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                />

                                {/* Start Date */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-gray-600 mb-1">Start Date</label>
                                    <input
                                        value={formatMonthValue(experience.start_date)}
                                        onChange={(e) =>
                                            updateExperience(index, 'start_date', e.target.value)
                                        }
                                        type="month"
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* End Date */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-gray-600 mb-1">End Date</label>
                                    <input
                                        value={formatMonthValue(experience.end_date)}
                                        onChange={(e) =>
                                            updateExperience(index, 'end_date', e.target.value)
                                        }
                                        type="month"
                                        disabled={experience.is_current}
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none disabled:bg-gray-100"
                                    />
                                </div>
                            </div>

                            {/* Checkbox */}
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={experience.is_current}
                                    onChange={(e) =>
                                        updateExperience(index, 'is_current', e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Currently working here
                            </label>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Job Description
                                    </label>
                                    <button
                                    disabled={generatingIndex === index || !experience.position || !experience.company}
                                    onClick={()=>{generateDescription(index)}}
                                        type="button"
                                        className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                                    >
                                        {generatingIndex === index ? (<Loader2 className='size-4 animate-spin'/>) : (<Sparkles className="w-3 h-3" />)}

                                        Enhance with AI
                                    </button>
                                </div>

                                <textarea
                                    value={experience.description}
                                    onChange={(e) =>
                                        updateExperience(index, 'description', e.target.value)
                                    }
                                    rows={4}
                                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none resize-none"
                                    placeholder="Describe your role and achievements..."
                                />

                                <textarea
                                    value={experience.impact}
                                    onChange={(e) =>
                                        updateExperience(index, 'impact', e.target.value)
                                    }
                                    rows={2}
                                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none resize-none"
                                    placeholder="Quantified impact (%, numbers, metrics)..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExperienceForm;
