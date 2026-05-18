import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';

const HobbiesForm = ({ data = [], onChange }) => {
    const [newHobby, setNewHobby] = useState('');

    const addHobby = () => {
        const hobby = newHobby.trim();
        if (hobby && !data.includes(hobby)) {
            onChange([...data, hobby]);
            setNewHobby('');
        }
    };

    const removeHobby = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addHobby();
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Your Hobbies
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a hobby (e.g. Reading, Traveling)..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 outline-none transition-colors"
                        onChange={(e) => setNewHobby(e.target.value)}
                        value={newHobby}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={addHobby}
                        disabled={!newHobby.trim()}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {data?.map((hobby, index) => (
                        <span key={index} className="flex items-center gap-1 px-3 py-1 bg-white text-indigo-700 border border-indigo-100 rounded-full text-sm font-medium shadow-sm">
                            {hobby}
                            <button
                                onClick={() => removeHobby(index)}
                                className="ml-1 hover:bg-indigo-50 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3 text-indigo-400" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                <p className="text-xs text-indigo-800 leading-relaxed">
                    <strong> Tip:</strong> Including hobbies can show your personality and cultural fit, especially for creative or team-oriented roles.
                </p>
            </div>
        </div>
    );
};

export default HobbiesForm;
