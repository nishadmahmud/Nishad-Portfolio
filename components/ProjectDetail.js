"use client";

import { FaGithub, FaExternalLinkAlt, FaTools, FaCheckCircle, FaLayerGroup } from 'react-icons/fa';
import Image from 'next/image';

const ProjectDetail = ({ project }) => {
    if (!project) return null;

    return (
        <div className="flex flex-col">
            {/* Hero Image Section */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
                <div className="absolute inset-0 bg-slate-900/20 z-10"></div>
                <Image
                    src={project.image_url || '/placeholder.jpg'}
                    alt={project.title}
                    width={1200}
                    height={600}
                    unoptimized
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20 flex flex-col justify-end p-6 sm:p-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/25"
                            >
                                <FaExternalLinkAlt size={14} /> Live Demo
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold rounded-lg backdrop-blur-md border border-slate-600 transition-all"
                            >
                                <FaGithub size={16} /> View Code
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Overview */}
                    <div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                            Overview
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            {project.overview}
                        </p>
                    </div>

                    {/* Features Grid */}
                    {(project.features || project.user_features) && (
                        <div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                                <FaCheckCircle className="text-cyan-400" size={20} /> Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(project.features || []).concat(project.user_features || []).slice(0, 8).map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                                        <p className="text-slate-300 text-sm leading-relaxed">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar - Right Column */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Tech Stack */}
                    <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                        <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                            <FaLayerGroup className="text-purple-400" size={18} /> Tech Stack
                        </h3>

                        <div className="space-y-6">
                            {project.tech_stack?.frontend && (
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Frontend</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.frontend.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-700/50 text-slate-200 text-sm rounded-lg border border-slate-600/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.tech_stack?.backend && (
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Backend</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.backend.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-700/50 text-slate-200 text-sm rounded-lg border border-slate-600/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.tech_stack?.tools && (
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Tools</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.tools.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-700/50 text-slate-200 text-sm rounded-lg border border-slate-600/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Admin Credentials (if any) */}
            {project.admin_credentials && (
                <div className="mx-6 sm:mx-10 mb-10 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div>
                        <h4 className="text-yellow-400 font-bold mb-1">Demo Admin Access</h4>
                        <p className="text-slate-400 text-sm">Use these credentials to test admin features</p>
                    </div>
                    <div className="flex gap-4 text-sm font-mono text-slate-300 bg-black/20 px-4 py-2 rounded-lg border border-white/5">
                        <span><span className="text-slate-500">Email:</span> {project.admin_credentials.email}</span>
                        <span><span className="text-slate-500">Pass:</span> {project.admin_credentials.password}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
