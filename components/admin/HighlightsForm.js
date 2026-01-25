"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaStar } from 'react-icons/fa';
import Link from 'next/link';

export default function HighlightsForm({ highlight, onSuccess, isNew }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: highlight?.title || '',
        description: highlight?.description || '',
        icon: highlight?.icon || 'FaStar',
        display_order: highlight?.display_order || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { ...formData };

            if (highlight?.id) {
                const { error } = await supabase.from('about_highlights').update(payload).eq('id', highlight.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('about_highlights').insert([payload]);
                if (error) throw error;
            }

            toast.success('Highlight saved!');

            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
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
                    <Link href="/admin" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-white">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'New Highlight' : 'Edit Highlight'}
                    </h1>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="e.g. Always Learning"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Brief description..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Icon Name (React Icons)</label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="e.g. FaRocket"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Supported: FaGraduationCap, FaCode, FaLightbulb, FaRocket, FaStar, etc.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Sort Order</label>
                        <input
                            type="number"
                            name="display_order"
                            value={formData.display_order}
                            onChange={handleChange}
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
                        <FaSave /> {loading ? 'Saving...' : 'Save Highlight'}
                    </button>
                </div>
            </form>
        </div>
    );
}
