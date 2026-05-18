import { Award, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import React from 'react';

const CertificationsForm = ({ data = [], onChange }) => {
    const addCertification = () => {
        const newCert = {
            name: '',
            issuer: '',
            date: '',
            link: ''
        };
        onChange([...data, newCert]);
    };

    const removeCertification = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateCertification = (index, field, value) => {
        const updated = data.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert
        );
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                    type="button"
                >
                    <Plus className="size-4" />
                    Add Certification
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No certifications added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-800">
                                    Certification #{index + 1}
                                </h4>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removeCertification(index)}
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <input
                                    value={cert.name}
                                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                    type="text"
                                    placeholder="Certification Name (e.g. AWS Certified Solutions Architect)"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                                />
                                <div className="grid md:grid-cols-2 gap-3">
                                    <input
                                        value={cert.issuer}
                                        onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                        type="text"
                                        placeholder="Issuer (e.g. Amazon Web Services)"
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                                    />
                                    <input
                                        value={cert.date}
                                        onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                        type="text"
                                        placeholder="Date (e.g. Jan 2024)"
                                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <LinkIcon size={16} className="text-slate-400" />
                                    <input
                                        value={cert.link}
                                        onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                        type="url"
                                        placeholder="Credential Link (URL)"
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 outline-none"
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

export default CertificationsForm;
