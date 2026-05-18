import { Folder, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const ProjectForm = ({ data = [], onChange }) => {
    const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            github: '',
            link: '',
            date: '',
            description: '',
            tech: '',
            performance: ''
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = data.map((proj, i) =>
            i === index ? { ...proj, [field]: value } : proj
        );
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-end">
                <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                    type="button"
                >
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            {/* No Project Message */}
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No project added yet.</p>
                    <p>Click "Add Project" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((project, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 space-y-3"
                        >
                            {/* Header with Delete */}
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">
                                    Project #{index + 1}
                                </h4>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removeProject(index)}
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Inputs Section */}
                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={project.name}
                                    onChange={(e) =>
                                        updateProject(index, 'name', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Project Name"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={project.github}
                                    onChange={(e) =>
                                        updateProject(index, 'github', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Github Link"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={project.link}
                                    onChange={(e) =>
                                        updateProject(index, 'link', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Live Demo Link"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={project.type}
                                    onChange={(e) =>
                                        updateProject(index, 'type', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Project Type (e.g., Web App, ML Model)"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={project.date}
                                    onChange={(e) =>
                                        updateProject(index, 'date', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Date (e.g. June 2023)"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />

                                <input
                                    value={project.tech}
                                    onChange={(e) =>
                                        updateProject(index, 'tech', e.target.value)
                                    }
                                    type="text"
                                    placeholder="Tech Stack (e.g. React, Node.js, MongoDB)"
                                    className="px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <textarea
                                value={project.description}
                                onChange={(e) =>
                                    updateProject(index, 'description', e.target.value)
                                }
                                placeholder="Project Description"
                                className="w-full h-24 px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none resize-none"
                            />

                            <textarea
                                value={project.performance}
                                onChange={(e) =>
                                    updateProject(index, 'performance', e.target.value)
                                }
                                placeholder="Performance/results (e.g. Reduced latency by 20%)"
                                className="w-full h-16 px-3 py-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 outline-none resize-none"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectForm;
