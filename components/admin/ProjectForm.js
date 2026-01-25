"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FaSave, FaImage, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectForm({ project, isNew, onSuccess }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: project?.title || '',
        overview: project?.overview || '',
        live_url: project?.live_url || '',
        github_url: project?.github_url || '',
        image_url: project?.image_url || '',
        featured: project?.featured || false,
        card_techs: project?.tech_stack?.card_techs?.join(', ') || '',
        frontend: project?.tech_stack?.frontend?.join(', ') || '',
        backend: project?.tech_stack?.backend?.join(', ') || '',
        tools: project?.tech_stack?.tools?.join(', ') || '',
        features: project?.features?.join('\n') || '',
        user_features: project?.user_features?.join('\n') || ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `project_${Date.now()}.${fileExt}`;
            const filePath = `project-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: publicUrl }));
            toast.success('Image uploaded');
        } catch (error) {
            toast.error('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ... (validation and payload construction same as before)
            const tech_stack = {
                card_techs: formData.card_techs.split(',').map(s => s.trim()).filter(Boolean),
                frontend: formData.frontend.split(',').map(s => s.trim()).filter(Boolean),
                backend: formData.backend.split(',').map(s => s.trim()).filter(Boolean),
                tools: formData.tools.split(',').map(s => s.trim()).filter(Boolean),
            };

            const features = formData.features.split('\n').filter(Boolean);
            const user_features = formData.user_features.split('\n').filter(Boolean);

            const payload = {
                title: formData.title,
                overview: formData.overview,
                live_url: formData.live_url,
                github_url: formData.github_url,
                image_url: formData.image_url,
                featured: formData.featured,
                tech_stack,
                features,
                user_features
            };

            if (isNew || !project?.id) {
                const { error } = await supabase.from('projects').insert([payload]);
                if (error) throw error;
                toast.success('Project created!');
            } else {
                const { error } = await supabase.from('projects').update(payload).eq('id', project.id);
                if (error) throw error;
                toast.success('Project updated!');
            }

            if (onSuccess) {
                onSuccess();
            } else {
                router.refresh();
                router.push('/admin/projects');
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
                    <Link href="/admin/projects" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-white">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'New Project' : 'Edit Project'}
                    </h1>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-800 pb-2">Basic Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Overview</label>
                            <textarea
                                name="overview"
                                value={formData.overview}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Live URL</label>
                            <input
                                type="url"
                                name="live_url"
                                value={formData.live_url}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL</label>
                            <input
                                type="url"
                                name="github_url"
                                value={formData.github_url}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="featured"
                                id="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 bg-slate-950 border-slate-800"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-slate-400">Featured Project</label>
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-800 pb-2">Project Image</h3>
                    <div className="flex items-start gap-6">
                        <div className="w-40 h-24 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                            {formData.image_url ? (
                                <Image
                                    src={formData.image_url}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <FaImage className="text-slate-700 text-3xl" />
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block w-full text-slate-400 text-sm mb-2">
                                {uploading ? 'Uploading...' : 'Upload Image'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="block w-full text-sm text-slate-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-cyan-600 file:text-white
                                hover:file:bg-cyan-500
                                "
                            />
                            <p className="text-xs text-slate-500 mt-2">Recommended size: 1200x600px</p>

                            {/* Manual URL Input fallback */}
                            <input
                                type="text"
                                name="image_url"
                                placeholder="Or enter Image URL directly"
                                value={formData.image_url}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs mt-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-800 pb-2">Tech Stack (comma separated)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Card Techs (Visible on Grid)</label>
                            <input
                                type="text"
                                name="card_techs"
                                value={formData.card_techs}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Frontend</label>
                            <input
                                type="text"
                                name="frontend"
                                value={formData.frontend}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Backend</label>
                            <input
                                type="text"
                                name="backend"
                                value={formData.backend}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Tools</label>
                            <input
                                type="text"
                                name="tools"
                                value={formData.tools}
                                onChange={handleChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-800 pb-2">Detail Features (one per line)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Key Features (Technical)</label>
                            <textarea
                                name="features"
                                value={formData.features}
                                onChange={handleChange}
                                rows={6}
                                placeholder="- Secured Authentication\n- Real-time DB"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">User Features (Functional)</label>
                            <textarea
                                name="user_features"
                                value={formData.user_features}
                                onChange={handleChange}
                                rows={6}
                                placeholder="- Login/Signup\n- Create Post"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaSave /> {loading ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </form>
        </div>
    );
}
