"use client";

import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ProjectDetail from './ProjectDetail';
import ProjectForm from './admin/ProjectForm';
import AdminModal from './admin/AdminModal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const TABS = [
    { key: 'personal', label: 'Personal' },
    { key: 'work', label: 'Work' },
];

const Projects = ({ projects = [], isAdmin }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Admin States
    const [editingProject, setEditingProject] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const filteredProjects = projects.filter(p => p.category === activeTab);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
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
            <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 relative"
                >
                    <p className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 flex items-center justify-center gap-4">
                        Portfolio
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        Things I've <em>Built.</em>
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

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-1 mb-16"
                >
                    <div className="flex border border-[var(--line)] rounded-none overflow-hidden">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative px-8 py-3 text-xs uppercase tracking-[0.25em] font-mono transition-all duration-300
                                    ${activeTab === tab.key
                                        ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                                        : 'bg-[var(--bg2)] text-[var(--text-dim)] hover:text-[var(--white)] hover:bg-[var(--bg3)]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        {filteredProjects.length === 0 ? (
                            <motion.div
                                variants={itemVariants}
                                className="col-span-full text-center py-20"
                            >
                                <p className="text-sm tracking-[0.1em] text-[var(--text-dim)] uppercase">
                                    No {activeTab} projects yet.
                                </p>
                            </motion.div>
                        ) : (
                            filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    className="group relative bg-[var(--bg2)] border border-[var(--line)] rounded-none overflow-hidden hover:border-[var(--line-bright)] transition-all duration-500 cursor-pointer"
                                    onClick={() => openModal(project)}
                                >
                                    {/* Admin Actions */}
                                    {isAdmin && (
                                        <div className="absolute top-3 right-3 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => handleEdit(e, project)}
                                                className="p-2 bg-blue-600 text-white rounded-none hover:bg-blue-500 shadow-md transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(e, project.id)}
                                                className="p-2 bg-red-600 text-white rounded-none hover:bg-red-500 shadow-md transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="relative h-56 lg:h-64 w-full overflow-hidden">
                                        <Image
                                            src={project.screenshots?.[0] || project.image_url || '/placeholder.jpg'}
                                            alt={project.title}
                                            width={800}
                                            height={500}
                                            unoptimized
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg2)] via-transparent to-transparent opacity-60" />

                                        {/* Year badge */}
                                        {project.year && (
                                            <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase font-mono text-[var(--text-muted)] bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--line)] px-3 py-1">
                                                {project.year}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 lg:p-8">
                                        {/* Project number + title */}
                                        <div className="flex items-start gap-4 mb-3">
                                            <span className="text-xs tracking-[0.2em] text-[var(--text-dim)] font-mono mt-2 shrink-0">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="text-2xl lg:text-3xl font-serif font-light text-[var(--white)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm tracking-[0.02em] text-[var(--text-muted)] leading-[1.8] mb-6 ml-10">
                                            {project.short_description || project.overview}
                                        </p>

                                        {/* Tech chips + links */}
                                        <div className="ml-10 pt-5 border-t border-[var(--line)] flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech_stack?.card_techs?.slice(0, 3).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 text-[var(--text-dim)] border border-[var(--line)] font-mono"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech_stack?.card_techs?.length > 3 && (
                                                    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 text-[var(--text-dim)] font-mono">
                                                        +{project.tech_stack.card_techs.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                                                    >
                                                        <FaGithub size={16} />
                                                    </a>
                                                )}
                                                {project.live_url && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                                                    >
                                                        <FaExternalLinkAlt size={14} />
                                                    </a>
                                                )}
                                                <span className="text-lg text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-1">
                                                    ↗
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {modalOpen && selectedProject && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[var(--bg)]/95 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full h-full max-w-[1400px] max-h-[95vh] mx-4 my-4 lg:mx-8 bg-[var(--bg2)] border border-[var(--line)] rounded-none shadow-2xl overflow-hidden flex flex-col lg:flex-row overflow-y-auto lg:overflow-y-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-[var(--bg)] border border-[var(--line)] text-[var(--text-muted)] hover:text-[var(--white)] hover:border-[var(--line-bright)] transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <ProjectDetail project={selectedProject} onClose={closeModal} />
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
                        router.refresh();
                    }}
                />
            </AdminModal>
        </section>
    );
};

export default Projects;
