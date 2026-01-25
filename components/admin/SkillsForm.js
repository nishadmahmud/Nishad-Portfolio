"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

export default function SkillsForm({ skill, isNew, onSuccess }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: skill?.name || '',
        icon: skill?.icon || '',
        bg_color: skill?.bg_color || 'bg-gradient-to-br from-slate-700 to-slate-900',
        category: skill?.category || 'Frontend',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isNew || !skill?.id) {
                const { error } = await supabase.from('skills').insert([formData]);
                if (error) throw error;
                toast.success('Skill added!');
            } else {
                const { error } = await supabase.from('skills').update(formData).eq('id', skill.id);
                if (error) throw error;
                toast.success('Skill updated!');
            }

            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
                router.push('/admin/skills');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Toaster position="top-right" />

            {!onSuccess && (
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/admin/skills" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-white">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'Add Skill' : 'Edit Skill'}
                    </h1>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Skill Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Database">Database</option>
                            <option value="Tools">Tools</option>
                            <option value="Language">Language</option>
                            <option value="AI">AI</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Icon Name (e.g., FaReact, SiNextdotjs)</label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            required
                            placeholder="FaReact"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                        <p className="text-xs text-slate-500 mt-1">Check <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-cyan-400 hover:underline">React Icons</a> for names.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Background Gradient Class</label>
                        <input
                            type="text"
                            name="bg_color"
                            value={formData.bg_color}
                            onChange={handleChange}
                            placeholder="bg-gradient-to-br from-cyan-400 to-blue-500"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 text-xs"
                        />
                        <div className={`mt-2 h-8 w-full rounded-md ${formData.bg_color}`}></div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaSave /> {loading ? 'Saving...' : 'Save Skill'}
                    </button>
                </div>
            </form>
        </div>
    );
}
