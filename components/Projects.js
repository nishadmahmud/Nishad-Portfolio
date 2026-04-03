"use client";

import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaExpandArrowsAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ProjectDetail from './ProjectDetail';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProjectForm from './admin/ProjectForm';
import AdminModal from './admin/AdminModal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Projects = ({ projects = [], isAdmin }) => {
    const [selectedProject, setSelectedProject] = useState(null); // For View Details
    const [modalOpen, setModalOpen] = useState(false); // For View Details

    // Admin States
    const [editingProject, setEditingProject] = useState(null); // For Edit
    const [isAdding, setIsAdding] = useState(false); // For Add
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const openModal = (project) => {
        setSelectedProject(project);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
        document.body.style.overflow = '';
    };

    // Admin Handlers
    const handleEdit = (e, project) => {
        e.stopPropagation();
        setEditingProject(project);
        setIsAdding(false);
        setAdminModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProject(null);
        setIsAdding(true);
        setAdminModalOpen(true);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            toast.success('Project deleted');
            router.refresh();
        } catch (error) {
            toast.error('Delete failed: ' + error.message);
        }
    };

    const closeAdminModal = () => {
        setAdminModalOpen(false);
        setEditingProject(null);
        setIsAdding(false);
    };

    return (
        <section id="projects" className="py-20 relative">
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
                        Projects
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        Creative solutions and <em>recent work.</em>
                    </h2>

                    {isAdmin && (
                        <div className="absolute top-0 right-0 md:right-20">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg"
                            >
                                <FaPlus /> Add Project
                            </button>
                        </div>
                    )}
                </motion.div>

                {projects.length === 0 ? (
                    <div className="text-center text-slate-400 py-10">
                        <p>No projects found. {isAdmin && 'Click "Add Project" to start!'}</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className="group relative bg-[var(--bg2)] border border-[var(--line)] rounded-none overflow-hidden hover:bg-[var(--bg3)] hover:border-[var(--line-bright)] transition-colors duration-300 flex flex-col h-full"
                            >
                                {/* Admin Actions Overlay */}
                                {isAdmin && (
                                    <div className="absolute top-2 right-2 z-30 flex gap-2">
                                        <button
                                            onClick={(e) => handleEdit(e, project)}
                                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md transition-colors"
                                            title="Edit Project"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, project.id)}
                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md transition-colors"
                                            title="Delete Project"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* Image Container */}
                                <div
                                    className="relative h-56 w-full cursor-pointer overflow-hidden"
                                    onClick={() => openModal(project)}
                                >
                                    <Image
                                        src={project.image_url || '/placeholder.jpg'}
                                        alt={project.title}
                                        width={600}
                                        height={400}
                                        unoptimized
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-medium flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors">
                                            <FaExpandArrowsAlt /> View Details
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-grow relative">
                                    <h3 className="text-3xl font-serif font-light text-[var(--white)] mb-4 leading-tight group-hover:text-[var(--accent)] transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] mb-8 line-clamp-3 leading-[2]">
                                        {project.overview}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-[var(--line)] flex flex-col gap-6">
                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_stack?.card_techs?.slice(0, 4).map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs uppercase tracking-[0.25em] px-3 py-1 bg-transparent text-[var(--text-muted)] rounded-none border border-[var(--line)]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech_stack?.card_techs?.length > 4 && (
                                                <span className="text-xs uppercase tracking-[0.25em] px-3 py-1 text-[var(--text-dim)]">+{project.tech_stack.card_techs.length - 4}</span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-between gap-3 mt-2">
                                            <div className="flex gap-4">
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
                                                        title="View Code"
                                                    >
                                                        <FaGithub size={18} />
                                                    </a>
                                                )}
                                                {project.live_url && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
                                                        title="Live Demo"
                                                    >
                                                        <FaExternalLinkAlt size={16} />
                                                    </a>
                                                )}
                                            </div>
                                            <span className="text-xl text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                                                ↗
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Public Details Modal */}
            <AnimatePresence>
                {modalOpen && selectedProject && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="overflow-y-auto custom-scrollbar flex-1">
                                <ProjectDetail project={selectedProject} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Admin Edit Modal */}
            <AdminModal
                isOpen={adminModalOpen}
                onClose={closeAdminModal}
                title={isAdding ? "Add New Project" : "Edit Project"}
            >
                <ProjectForm
                    project={editingProject}
                    onSuccess={() => {
                        closeAdminModal();
                        router.refresh(); // Ensure data refreshes
                    }}
                />
            </AdminModal>
        </section>
    );
};

export default Projects;
