"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import PublicationsForm from './admin/PublicationsForm';
import AdminModal from './admin/AdminModal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Publications = ({ publications = [], isAdmin }) => {
    const [editingPublication, setEditingPublication] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    // Admin Handlers
    const handleEdit = (e, pub) => {
        e.stopPropagation();
        setEditingPublication(pub);
        setIsAdding(false);
        setAdminModalOpen(true);
    };

    const handleAdd = () => {
        setEditingPublication(null);
        setIsAdding(true);
        setAdminModalOpen(true);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this publication?')) return;

        try {
            const { error } = await supabase.from('publications').delete().eq('id', id);
            if (error) throw error;
            toast.success('Publication deleted');
            router.refresh();
        } catch (error) {
            toast.error('Delete failed: ' + error.message);
        }
    };

    const closeAdminModal = () => {
        setAdminModalOpen(false);
        setEditingPublication(null);
        setIsAdding(false);
    };

    return (
        <section id="publications" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <p className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 flex items-center justify-center gap-4">
                        Publications
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        Accepted Research <em>Papers.</em>
                    </h2>

                    {isAdmin && (
                        <div className="absolute top-0 right-0 md:right-20">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg"
                            >
                                <FaPlus /> Add Publication
                            </button>
                        </div>
                    )}
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {publications.map((pub, index) => (
                        <motion.div
                            key={pub.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-[var(--bg2)] border border-[var(--line)] rounded-none p-10 hover:bg-[var(--bg3)] hover:border-[var(--line-bright)] transition-colors duration-300"
                        >
                            {/* Admin Actions Overlay */}
                            {isAdmin && (
                                <div className="absolute top-2 right-2 z-20 flex gap-2">
                                    <button
                                        onClick={(e) => handleEdit(e, pub)}
                                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md transition-colors"
                                        title="Edit Publication"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, pub.id)}
                                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md transition-colors"
                                        title="Delete Publication"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                </div>
                            )}

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <h3 className="text-3xl font-serif font-light text-[var(--white)] leading-tight group-hover:text-[var(--accent)] transition-colors max-w-2xl">
                                        {pub.title}
                                    </h3>
                                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] whitespace-nowrap mt-2 sm:mt-0">
                                        {pub.status}
                                    </span>
                                </div>

                                <div className="text-sm tracking-[0.04em] text-[var(--text-muted)] leading-[2]">
                                    {pub.authors.map((author, i) => (
                                        <span key={i} className={author.includes("Nishad") ? "text-[var(--white)] font-normal" : ""}>
                                            {author}{i < pub.authors.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm tracking-[0.04em] text-[var(--text-dim)] border-t border-[var(--line)] pt-6 mt-2 relative">
                                    <span>{pub.year}</span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[var(--text-muted)]">{pub.short_conference}</span>
                                        <span className="hidden sm:inline text-[var(--line-bright)]">-</span>
                                        <span>{pub.location}</span>
                                    </div>
                                </div>

                                {pub.link && (
                                    <div className="mt-1 flex items-center justify-between">
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm tracking-[0.04em] text-[var(--text-muted)] hover:text-[var(--white)] transition-colors"
                                        >
                                            DOI: {pub.doi_link}
                                        </a>
                                        <span className="absolute bottom-10 right-10 text-xl text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 hidden sm:block">
                                            ↗
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Admin Edit Modal */}
            <AdminModal
                isOpen={adminModalOpen}
                onClose={closeAdminModal}
                title={isAdding ? "Add Publication" : "Edit Publication"}
            >
                <PublicationsForm
                    publication={editingPublication}
                    onSuccess={() => {
                        closeAdminModal();
                        router.refresh();
                    }}
                />
            </AdminModal>
        </section>
    );
};

export default Publications;
