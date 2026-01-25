"use client";

import { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import ProjectDetail from './ProjectDetail';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch('/projects.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load projects');
                return res.json();
            })
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

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
        setTimeout(() => setSelectedProject(null), 300); // Clear after animation
        document.body.style.overflow = '';
    };

    const handleBackdropScroll = (e) => {
        e.stopPropagation();
    };

    if (loading) return <div className="text-center text-slate-400 py-20">Loading amazing projects...</div>;
    if (error) return <div className="text-center text-red-400 py-20">{error}</div>;

    return (
        <section id="projects" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
                        <span className="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Creative solutions and recent work
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <div
                                className="relative h-56 w-full cursor-pointer overflow-hidden"
                                onClick={() => openModal(project)}
                            >
                                <Image
                                    src={project.image}
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
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                    {project.overview}
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-700/50 flex flex-col gap-4">
                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.card_techs && project.card_techs.slice(0, 4).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-medium px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-md border border-slate-600/50"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.card_techs && project.card_techs.length > 4 && (
                                            <span className="text-xs font-medium px-2.5 py-1 text-slate-500">+{project.card_techs.length - 4}</span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between gap-3 mt-2">
                                        <div className="flex gap-3">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
                                                    title="View Code"
                                                >
                                                    <FaGithub size={20} />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
                                                    title="Live Demo"
                                                >
                                                    <FaExternalLinkAlt size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

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
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Content - Scrollable Area */}
                            <div className="overflow-y-auto custom-scrollbar flex-1">
                                <ProjectDetail project={selectedProject} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
