"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function PublicationsForm({ publication, isNew, onSuccess }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: publication?.title || '',
        authors: publication?.authors?.join(', ') || '', // Comma separated for editing
        conference: publication?.conference || '',
        short_conference: publication?.short_conference || '',
        location: publication?.location || '',
        year: publication?.year || '',
        status: publication?.status || 'Accepted',
        doi_link: publication?.doi_link || '',
        link: publication?.link || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Split authors back to array/JSONB
            const authorsArray = formData.authors.split(',').map(s => s.trim()).filter(Boolean);

            const payload = {
                ...formData,
                authors: authorsArray
            };

            if (isNew || !publication?.id) {
                const { error } = await supabase.from('publications').insert([payload]);
                if (error) throw error;
                toast.success('Publication added!');
            } else {
                const { error } = await supabase.from('publications').update(payload).eq('id', publication.id);
                if (error) throw error;
                toast.success('Publication updated!');
            }

            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
                router.push('/admin/publications');
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
                    <Link href="/admin/publications" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-white">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'Add Publication' : 'Edit Publication'}
                    </h1>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Paper Title</label>
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
                        <label className="block text-sm font-medium text-slate-400 mb-1">Authors (comma separated)</label>
                        <textarea
                            name="authors"
                            value={formData.authors}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Author 1, Author 2, Author 3"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Conference Name</label>
                            <input
                                type="text"
                                name="conference"
                                value={formData.conference}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Short Name (e.g. ICCIT 2025)</label>
                            <input
                                type="text"
                                name="short_conference"
                                value={formData.short_conference}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Year/Date</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="December 2025"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            >
                                <option value="Accepted">Accepted</option>
                                <option value="Published">Published</option>
                                <option value="Under Review">Under Review</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">DOI (Optional)</label>
                            <input
                                type="text"
                                name="doi_link"
                                value={formData.doi_link}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Paper Link (Optional)</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaSave /> {loading ? 'Saving...' : 'Save Publication'}
                    </button>
                </div>
            </form>
        </div>
    );
}
