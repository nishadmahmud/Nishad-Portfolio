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
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
                        <span className="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
                            Publications
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Accepted Research Papers
                    </p>

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
                            whileHover={{
                                scale: 1.01,
                                boxShadow: "0 0 20px #64748b55"
                            }}
                            className="group relative backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 hover:border-slate-400 transition-all duration-300"
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

                            <div className="flex flex-col gap-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[24px] text-cyan-400">
                                            <FaBook size={20} />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight">
                                            {pub.title}
                                        </h3>
                                    </div>
                                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/20 whitespace-nowrap shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                        {pub.status}
                                    </span>
                                </div>

                                <div className="text-slate-400 text-sm leading-relaxed pl-9">
                                    {pub.authors.map((author, i) => (
                                        <span key={i} className={author.includes("Nishad") ? "text-cyan-400 font-semibold" : ""}>
                                            {author}{i < pub.authors.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 pl-9 border-t border-slate-700/50 pt-4 mt-2">
                                    <span className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-slate-400" />
                                        {pub.year}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium text-slate-300">{pub.short_conference}</span>
                                        <span className="hidden sm:inline text-slate-500">-</span>
                                        <div className="flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-slate-400 flex-shrink-0" />
                                            <span>{pub.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {pub.link && (
                                    <div className="pl-9 mt-1">
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-all"
                                        >
                                            <FaExternalLinkAlt size={12} />
                                            DOI: {pub.doi_link}
                                        </a>
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
