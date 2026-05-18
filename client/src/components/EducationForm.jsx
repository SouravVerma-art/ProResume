import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const EducationForm = ({ data, onChange }) => {
    const addEducation = () => {
        const newEducation = {
            institution: '',
            degree: '',
            field: '',
            graduation_date: '',
            gpa: '',
            location: ''
        };
        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateEducation = (index, field, value) => {
        const updated = data.map((edu, i) =>
            i === index ? { ...edu, [field]: value } : edu
        );
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-end">
                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                    type="button"
                >
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {/* No Education Message */}
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No education added yet.</p>
                    <p>Click "Add Education" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((education, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 space-y-3"
                        >
                            {/* Header with Delete */}
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">
                                    Education #{index + 1}
                                </h4>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removeEducation(index)}
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Inputs Section */}
                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={education.institution}
                                    onChange={(e) =>
                                        updateEducation(index, 'institution', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Institution Name"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={education.degree}
                                    onChange={(e) =>
                                        updateEducation(index, 'degree', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Degree (e.g., B.Tech, B.Sc, M.A)"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={education.field}
                                    onChange={(e) =>
                                        updateEducation(index, 'field', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Field of Study (e.g. Computer Science)"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={education.graduation_date}
                                    onChange={(e) =>
                                        updateEducation(index, 'graduation_date', e.target.value)
                                    }
                                    type="month"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={education.location}
                                    onChange={(e) =>
                                        updateEducation(index, 'location', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Location (e.g. New York, NY)"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <input
                                value={education.gpa}
                                onChange={(e) =>
                                    updateEducation(index, 'gpa', e.target.value)
                                }
                                type="text"
                                placeholder="GPA (optional)"
                                className="w-full px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EducationForm;
