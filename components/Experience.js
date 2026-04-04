"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ExperienceForm from './admin/ExperienceForm';
import AdminModal from './admin/AdminModal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Experience = ({ experiences = [], isAdmin }) => {
    // Admin States
    const [editingExperience, setEditingExperience] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    // Admin Handlers
    const handleEdit = (e, exp) => {
        e.stopPropagation();
        setEditingExperience(exp);
        setIsAdding(false);
        setAdminModalOpen(true);
    };

    const handleAdd = () => {
        setEditingExperience(null);
        setIsAdding(true);
        setAdminModalOpen(true);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this experience?')) return;

        try {
            const { error } = await supabase.from('experience').delete().eq('id', id);
            if (error) throw error;
            toast.success('Experience deleted');
            router.refresh();
        } catch (error) {
            toast.error('Delete failed: ' + error.message);
        }
    };

    const closeAdminModal = () => {
        setAdminModalOpen(false);
        setEditingExperience(null);
        setIsAdding(false);
    };

    return (
        <section id="experience" className="py-20 relative">

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <p className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 flex items-center justify-center gap-4">
                        Experience
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        Professional <em>Milestones.</em>
                    </h2>
                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] max-w-2xl mx-auto leading-[2]">
                        Professional experience and career highlights
                    </p>

                    {isAdmin && (
                        <div className="absolute top-0 right-0 md:right-20">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg"
                            >
                                <FaPlus /> Add Experience
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Timeline Container */}
                <div className="max-w-2xl mx-auto relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-[1px] bg-[var(--line)]"></div>

                    <div className="space-y-10">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id || index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="relative flex items-start gap-6 pl-10 sm:pl-12 group"
                            >
                                {/* Admin Actions Overlay */}
                                {isAdmin && (
                                    <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <button
                                            onClick={(e) => handleEdit(e, exp)}
                                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md transition-colors"
                                            title="Edit Experience"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, exp.id)}
                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md transition-colors"
                                            title="Delete Experience"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                )}

                                {/* Timeline Dot */}
                                <motion.div
                                    className="absolute left-[8px] sm:left-[11.5px] top-1"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`w-[10px] h-[10px] rounded-none ${exp.is_current
                                        ? 'bg-[var(--accent)] border-[var(--accent)]'
                                        : 'bg-[var(--bg)] border shadow-[0_0_0_2px_var(--line)]'
                                        }`}>
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="flex-1 bg-[var(--bg2)] border border-[var(--line)] rounded-none p-6 sm:p-8 hover:bg-[var(--bg3)] hover:border-[var(--line-bright)] transition-colors duration-300">
                                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-dim)]">{exp.period}</span>
                                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[var(--white)] mt-3">
                                        {exp.title}
                                    </h3>
                                    <a
                                        href={exp.company_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[var(--accent)] transition-colors duration-300 mt-2 hover:text-[var(--white)] text-sm tracking-[0.04em]"
                                    >
                                        {exp.company}
                                        <span className="font-serif">↗</span>
                                    </a>
                                    <p className="text-[var(--text-muted)] text-sm tracking-[0.04em] mt-4 leading-[2]">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Admin Edit Modal */}
            <AdminModal
                isOpen={adminModalOpen}
                onClose={closeAdminModal}
                title={isAdding ? "Add Experience" : "Edit Experience"}
            >
                <ExperienceForm
                    experience={editingExperience}
                    onSuccess={() => {
                        closeAdminModal();
                        router.refresh();
                    }}
                />
            </AdminModal>
        </section>
    );
};

export default Experience;
