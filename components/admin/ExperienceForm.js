"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function ExperienceForm({ experience, isNew, onSuccess }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: experience?.title || '',
        company: experience?.company || '',
        company_url: experience?.company_url || '',
        period: experience?.period || '',
        is_current: experience?.is_current || false,
        description: experience?.description || '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isNew || !experience?.id) {
                const { error } = await supabase.from('experience').insert([formData]);
                if (error) throw error;
                toast.success('Experience added!');
            } else {
                const { error } = await supabase.from('experience').update(formData).eq('id', experience.id);
                if (error) throw error;
                toast.success('Experience updated!');
            }

            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
                router.push('/admin/experience');
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
                    <Link href="/admin/experience" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-white">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'Add Experience' : 'Edit Experience'}
                    </h1>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-400 mb-1">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Company URL</label>
                        <input
                            type="url"
                            name="company_url"
                            value={formData.company_url}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Period (e.g. Jan 2024 - Present)</label>
                        <input
                            type="text"
                            name="period"
                            value={formData.period}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <input
                            type="checkbox"
                            name="is_current"
                            id="is_current"
                            checked={formData.is_current}
                            onChange={handleChange}
                            className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 bg-slate-950 border-slate-800"
                        />
                        <label htmlFor="is_current" className="text-sm font-medium text-slate-400">Currently Working Here</label>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaSave /> {loading ? 'Saving...' : 'Save Experience'}
                    </button>
                </div>
            </form>
        </div>
    );
}
