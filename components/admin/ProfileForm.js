"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { FaSave, FaUser } from 'react-icons/fa';

export default function ProfileForm({ profile, onSuccess, mode = 'all' }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: profile?.full_name || '',
        bio: profile?.bio || '',
        landing_text: profile?.landing_text || '',
        headline: profile?.headline || '',
        resume_url: profile?.resume_url || '',
        image_url: profile?.image_url || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResumeUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `resume_${Date.now()}.${fileExt}`;
            const filePath = `documents/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, resume_url: publicUrl }));
            toast.success('Resume uploaded!');
        } catch (error) {
            toast.error('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        // ... previous logic
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { ...formData };

            if (profile?.id) {
                const { error } = await supabase.from('profile').update(payload).eq('id', profile.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('profile').insert([payload]);
                if (error) throw error;
            }

            toast.success('Profile updated!');

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

    const getTitle = () => {
        switch (mode) {
            case 'hero_text': return 'Edit Hero Text';
            case 'image': return 'Update Profile Image';
            case 'resume': return 'Update Resume';
            case 'bio': return 'Edit Bio';
            default: return 'Edit Profile';
        }
    };

    const shouldShow = (fieldMode) => mode === 'all' || mode === fieldMode;

    return (
        <div className="max-w-4xl mx-auto">
            <Toaster position="top-right" />

            {!onSuccess && (
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white">
                        <FaUser size={20} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">{getTitle()}</h1>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
                <div className="grid grid-cols-1 gap-6">
                    {shouldShow('hero_text') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Top Greeting</label>
                                <input
                                    type="text"
                                    name="landing_text"
                                    value={formData.landing_text}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="e.g. Hello, I'm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Name / Title</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="e.g. Nishad"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Headline</label>
                                <input
                                    type="text"
                                    name="headline"
                                    value={formData.headline}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="e.g. Full Stack Developer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Short Bio (Hero Intro)</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="Brief introduction displayed below headline..."
                                />
                            </div>
                        </>
                    )}

                    {shouldShow('bio') && (
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Bio (About Section)</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={5}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                            />
                        </div>
                    )}

                    {shouldShow('image') && (
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Profile Image</label>
                            <div className="flex gap-4 items-start">
                                <div className="w-20 h-20 bg-slate-800 rounded-full overflow-hidden flex-shrink-0 relative">
                                    {formData.image_url ? (
                                        <img src={formData.image_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                            <FaUser size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 mb-2"
                                    />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={async (e) => {
                                                try {
                                                    setUploading(true);
                                                    const file = e.target.files[0];
                                                    if (!file) return;

                                                    const fileExt = file.name.split('.').pop();
                                                    const fileName = `profile_${Date.now()}.${fileExt}`;
                                                    const filePath = `images/${fileName}`;

                                                    const { error: uploadError } = await supabase.storage
                                                        .from('portfolio-assets')
                                                        .upload(filePath, file);

                                                    if (uploadError) throw uploadError;

                                                    const { data: { publicUrl } } = supabase.storage
                                                        .from('portfolio-assets')
                                                        .getPublicUrl(filePath);

                                                    setFormData(prev => ({ ...prev, image_url: publicUrl }));
                                                    toast.success('Image uploaded!');
                                                } catch (error) {
                                                    toast.error('Upload failed: ' + error.message);
                                                } finally {
                                                    setUploading(false);
                                                }
                                            }}
                                            accept="image/*"
                                            disabled={uploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <button type="button" className="px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700 text-sm">
                                            {uploading ? 'Uploading...' : 'Upload New Image'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {shouldShow('resume') && (
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Resume URL or Upload</label>
                            <div className="flex gap-4">
                                <input
                                    type="url"
                                    name="resume_url"
                                    value={formData.resume_url}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"
                                />
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handleResumeUpload}
                                        accept=".pdf,.doc,.docx"
                                        disabled={uploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <button type="button" className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700">
                                        {uploading ? 'Uploading...' : 'Upload PDF'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaSave /> {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}
