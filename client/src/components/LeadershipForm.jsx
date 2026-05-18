import { Users, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const LeadershipForm = ({ data = [], onChange }) => {
    const addItem = () => {
        const newItem = {
            role: '',
            organization: '',
            date: '',
            description: ''
        };
        onChange([...data, newItem]);
    };

    const removeItem = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateItem = (index, field, value) => {
        const updated = data.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <button
                    onClick={addItem}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                    type="button"
                >
                    <Plus className="size-4" />
                    Add Item
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No volunteering or leadership items added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">
                                    Activity #{index + 1}
                                </h4>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removeItem(index)}
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={item.role}
                                    onChange={(e) => updateItem(index, 'role', e.target.value)}
                                    type="text"
                                    placeholder="Role/Title (e.g. Lead Mentor)"
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                />
                                <input
                                    value={item.organization}
                                    onChange={(e) => updateItem(index, 'organization', e.target.value)}
                                    type="text"
                                    placeholder="Organization Name"
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                />
                                <input
                                    value={item.date}
                                    onChange={(e) => updateItem(index, 'date', e.target.value)}
                                    type="text"
                                    placeholder="Duration (e.g. 2021 - 2023)"
                                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <textarea
                                value={item.description}
                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                rows={3}
                                placeholder="Mentoring/workshop contributions, etc."
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none resize-none"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LeadershipForm;
