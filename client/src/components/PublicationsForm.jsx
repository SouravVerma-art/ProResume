import { BookOpen, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const PublicationsForm = ({ data = [], onChange }) => {
    const addPublication = () => {
        const newPublication = {
            title: '',
            publisher: '',
            date: ''
        };
        onChange([...data, newPublication]);
    };

    const removePublication = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updatePublication = (index, field, value) => {
        const updated = data.map((pub, i) =>
            i === index ? { ...pub, [field]: value } : pub
        );
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <button
                    onClick={addPublication}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                    type="button"
                >
                    <Plus className="size-4" />
                    Add Publication
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No publications added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((publication, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">
                                    Publication #{index + 1}
                                </h4>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removePublication(index)}
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <input
                                    value={publication.title}
                                    onChange={(e) => updatePublication(index, 'title', e.target.value)}
                                    type="text"
                                    placeholder="Publication/Paper Title"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                />
                                <div className="grid md:grid-cols-2 gap-3">
                                    <input
                                        value={publication.publisher}
                                        onChange={(e) => updatePublication(index, 'publisher', e.target.value)}
                                        type="text"
                                        placeholder="Publisher (e.g. IEEE, Journal X)"
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                    />
                                    <input
                                        value={publication.date}
                                        onChange={(e) => updatePublication(index, 'date', e.target.value)}
                                        type="text"
                                        placeholder="Date (e.g. Oct 2023)"
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicationsForm;
