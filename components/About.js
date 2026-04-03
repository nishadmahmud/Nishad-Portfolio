"use client";

import { useState } from 'react';
import { motion } from 'framer-motion'
import { FaGraduationCap, FaCode, FaLightbulb, FaRocket, FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa'
import ProfileForm from './admin/ProfileForm';
import HighlightsForm from './admin/HighlightsForm';
import FeaturedForm from './admin/FeaturedForm';
import AdminModal from './admin/AdminModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';

const iconMap = {
    'FaGraduationCap': FaGraduationCap,
    'FaCode': FaCode,
    'FaLightbulb': FaLightbulb,
    'FaRocket': FaRocket,
    'FaStar': FaStar,
    // Add default fallback
};

const About = ({ profile, highlights = [], featured = [], isAdmin }) => {
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [editingHighlight, setEditingHighlight] = useState(null);
    const [editingFeatured, setEditingFeatured] = useState(null);
    const [modalMode, setModalMode] = useState('profile'); // 'profile', 'highlight', 'featured'
    const [isAdding, setIsAdding] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    // Use passed highlights directly since app/page.js guarantees fallback arrays
    const displayHighlights = highlights;

    // Use passed featured directly since app/page.js guarantees fallback arrays
    const displayFeatured = featured;

    const handleEditProfile = () => {
        setModalMode('profile');
        setAdminModalOpen(true);
    };

    const handleAddHighlight = () => {
        setModalMode('highlight');
        setEditingHighlight(null);
        setIsAdding(true);
        setAdminModalOpen(true);
    };

    const handleEditHighlight = (e, highlight) => {
        e.stopPropagation();
        setModalMode('highlight');
        setEditingHighlight(highlight);
        setIsAdding(false);
        setAdminModalOpen(true);
    };

    const handleDeleteHighlight = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this highlight?')) return;

        try {
            const { error } = await supabase.from('about_highlights').delete().eq('id', id);
            if (error) throw error;
            toast.success('Highlight deleted');
            router.refresh();
        } catch (error) {
            toast.error('Delete failed: ' + error.message);
        }
    };

    const handleAddFeatured = () => {
        setModalMode('featured');
        setEditingFeatured(null);
        setIsAdding(true);
        setAdminModalOpen(true);
    };

    const handleEditFeatured = (e, item) => {
        e.stopPropagation();
        setModalMode('featured');
        setEditingFeatured(item);
        setIsAdding(false);
        setAdminModalOpen(true);
    };

    const handleDeleteFeatured = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const { error } = await supabase.from('about_featured').delete().eq('id', id);
            if (error) throw error;
            toast.success('Item deleted');
            router.refresh();
        } catch (error) {
            toast.error('Delete failed: ' + error.message);
        }
    };

    const getModalTitle = () => {
        switch (modalMode) {
            case 'profile': return 'Edit Bio';
            case 'highlight': return isAdding ? 'Add Highlight Card' : 'Edit Highlight Card';
            case 'featured': return isAdding ? 'Add Featured Project' : 'Edit Featured Project';
            default: return 'Edit';
        }
    };

    return (
        <section id="about" className="py-20 relative">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 flex items-center justify-center gap-4">
                        Discover
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        About <em>Me.</em>
                    </h2>
                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] max-w-2xl mx-auto leading-[2]">
                        Passionate about building intuitive, efficient, and user-friendly software
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    viewport={{ once: true }}
                    className="bg-[var(--bg2)] border border-[var(--line)] rounded-none p-8 mb-8 max-w-4xl mx-auto relative group"
                >
                    {isAdmin && (
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={handleEditProfile}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 shadow-md transition-all"
                            >
                                <FaEdit /> Edit Bio
                            </button>
                        </div>
                    )}

                    <h3 className="text-3xl font-serif font-light text-[var(--white)] mb-6">
                        Hi, I'm {profile?.full_name}
                    </h3>
                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] leading-[2] mb-4">
                        {profile?.bio}
                    </p>
                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] leading-[2]">
                        Currently learning and building with React, Node.js, and Firebase, while also experienced in Java,
                        JavaScript, Python, and C++. I enjoy developing visual tools, automation scripts, and educational software.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2 relative">
                        {isAdmin && (
                            <div className="absolute -top-12 right-0">
                                <button
                                    onClick={handleAddHighlight}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 shadow-md transition-all"
                                >
                                    <FaPlus /> Add Card
                                </button>
                            </div>
                        )}

                        {displayHighlights.map((highlight, index) => {
                            const Icon = iconMap[highlight.icon] || FaStar;
                            return (
                                <motion.div
                                    key={highlight.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        backgroundColor: "var(--bg3)",
                                        borderColor: "var(--line-bright)"
                                    }}
                                    className="group/card relative bg-[var(--bg2)] border border-[var(--line)] rounded-none p-6 h-full flex flex-col justify-center transition-all duration-300"
                                >
                                    {/* Admin Actions Overlay for Card */}
                                    {isAdmin && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity z-20">
                                            <button
                                                onClick={(e) => handleEditHighlight(e, highlight)}
                                                className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md"
                                                title="Edit Card"
                                            >
                                                <FaEdit size={12} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteHighlight(e, highlight.id)}
                                                className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md"
                                                title="Delete Card"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-[var(--accent)]">
                                            <Icon size={20} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <h4 className="text-[var(--white)] font-serif font-light text-xl sm:text-2xl leading-none">{highlight.title}</h4>
                                    </div>
                                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] leading-[2]">
                                        {highlight.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        viewport={{ once: true }}
                        className="bg-[var(--bg2)] border border-[var(--line)] rounded-none p-8 h-full flex flex-col relative group"
                    >
                        {isAdmin && (
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={handleAddFeatured}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 shadow-md transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <FaPlus /> Add
                                </button>
                            </div>
                        )}
                        <h3 className="text-3xl font-serif font-light text-[var(--white)] mb-6">
                            Projects I'm Proud Of
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            {displayFeatured.map((project, index) => (
                                <motion.div
                                    key={project.id || index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3 relative group/item"
                                >
                                    {isAdmin && (
                                        <div className="absolute right-0 top-0 flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity bg-slate-800/80 backdrop-blur-sm rounded-lg p-1 z-10">
                                            <button
                                                onClick={(e) => handleEditFeatured(e, project)}
                                                className="p-1 text-blue-400 hover:text-blue-300"
                                                title="Edit"
                                            >
                                                <FaEdit size={12} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteFeatured(e, project.id)}
                                                className="p-1 text-red-400 hover:text-red-300"
                                                title="Delete"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    )}

                                    <div className="text-[var(--accent)] mt-1 flex-shrink-0">
                                        <FaStar size={12} />
                                    </div>
                                    <div>
                                        <h4 className="text-[var(--white)] font-serif font-light text-xl">{project.name}</h4>
                                        <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] mt-1 leading-[2]">{project.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Admin Edit Modal */}
            <AdminModal
                isOpen={adminModalOpen}
                onClose={() => setAdminModalOpen(false)}
                title={getModalTitle()}
            >
                {modalMode === 'profile' && (
                    <ProfileForm
                        profile={profile}
                        onSuccess={() => {
                            setAdminModalOpen(false);
                            router.refresh();
                        }}
                    />
                )}
                {modalMode === 'highlight' && (
                    <HighlightsForm
                        highlight={editingHighlight}
                        isNew={isAdding}
                        onSuccess={() => {
                            setAdminModalOpen(false);
                            router.refresh();
                        }}
                    />
                )}
                {modalMode === 'featured' && (
                    <FeaturedForm
                        featured={editingFeatured}
                        isNew={isAdding}
                        onSuccess={() => {
                            setAdminModalOpen(false);
                            router.refresh();
                        }}
                    />
                )}
            </AdminModal>
        </section>
    )
}

export default About
