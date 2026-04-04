"use client";

import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaGlobe, FaLock } from 'react-icons/fa';
import Image from 'next/image';

/**
 * Extract a readable page name from a filename.
 * "homepage-1.webp" → "Homepage"
 * "admin-dashboard-2.png" → "Admin Dashboard" 
 * "3.webp" → "Page 3"
 */
function extractPageName(filename) {
    // Get just the filename without path and extension
    const name = filename.split('/').pop().replace(/\.[^.]+$/, '');
    // Remove trailing number(s) and any separator before them
    const withoutNumber = name.replace(/[-_]?\d+$/, '');
    if (!withoutNumber) {
        const num = name.match(/(\d+)/);
        return `Page ${num ? num[1] : ''}`;
    }
    // Convert kebab/snake case to title case
    return withoutNumber
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

const ProjectDetail = ({ project, onClose }) => {
    if (!project) return null;

    const hasScreenshots = project.screenshots && project.screenshots.length > 0;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            {/* Left Panel - Browser Viewport / Screenshot Viewer */}
            <div className="h-[50vh] lg:h-auto lg:flex-1 lg:w-[60%] flex flex-col shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--line)]">
                {/* Fake Browser Chrome */}
                <div className="shrink-0 flex items-center gap-3 px-4 py-3 bg-[var(--bg)] border-b border-[var(--line)]">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={onClose}
                            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer"
                            title="Close"
                        />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                        <div className="w-3 h-3 rounded-full bg-green-500/40" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 flex items-center gap-2 bg-[var(--bg2)] border border-[var(--line)] rounded-sm px-3 py-1.5 mx-2">
                        <FaLock size={9} className="text-[var(--text-dim)] shrink-0" />
                        <span className="text-[11px] font-mono text-[var(--text-dim)] truncate">
                            {project.live_url || `github.com/${project.github_url?.split('github.com/')[1] || ''}`}
                        </span>
                    </div>
                </div>

                {/* Single Screenshot Viewer */}
                <div className="flex-1 overflow-y-auto bg-[var(--bg3)]">
                    {hasScreenshots ? (
                        <Image
                            key={activeIndex}
                            src={project.screenshots[activeIndex]}
                            alt={`${project.title} - ${extractPageName(project.screenshots[activeIndex])}`}
                            width={1400}
                            height={900}
                            unoptimized
                            className="w-full h-auto block"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center p-8">
                            <Image
                                src={project.image_url || '/placeholder.jpg'}
                                alt={project.title}
                                width={1200}
                                height={700}
                                unoptimized
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* Page Thumbnail Strip */}
                {hasScreenshots && project.screenshots.length > 1 && (
                    <div className="shrink-0 border-t border-[var(--line)] bg-[var(--bg)] px-3 py-2 overflow-x-auto">
                        <div className="flex items-center gap-2">
                            {project.screenshots.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`shrink-0 flex flex-col items-center gap-1 p-1 rounded-none border transition-all duration-200
                                        ${activeIndex === i
                                            ? 'border-[var(--accent)] bg-[var(--bg2)]'
                                            : 'border-transparent hover:border-[var(--line-bright)] hover:bg-[var(--bg2)]'
                                        }`}
                                    title={extractPageName(src)}
                                >
                                    <div className="w-16 h-10 overflow-hidden bg-[var(--bg3)]">
                                        <Image
                                            src={src}
                                            alt={extractPageName(src)}
                                            width={120}
                                            height={75}
                                            unoptimized
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    <span className={`text-[8px] tracking-[0.15em] uppercase font-mono truncate max-w-16
                                        ${activeIndex === i ? 'text-[var(--accent)]' : 'text-[var(--text-dim)]'}`}
                                    >
                                        {extractPageName(src)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Panel - Project Metadata */}
            <div className="lg:w-[40%] w-full overflow-y-auto bg-[var(--bg2)]">
                <div className="p-6 lg:p-8 space-y-8">
                    {/* Title + Year */}
                    <div>
                        {project.year && (
                            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-[var(--text-dim)] mb-3 block">
                                {project.category?.toUpperCase()} · {project.year}
                            </span>
                        )}
                        <h2 className="text-3xl lg:text-4xl font-serif font-light text-[var(--white)] leading-tight mb-4">
                            {project.title}
                        </h2>

                        {/* Role & Company (for work projects) */}
                        {(project.role || project.company) && (
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                                {project.role && (
                                    <span className="text-xs tracking-[0.15em] uppercase font-mono text-[var(--accent)]">
                                        {project.role}
                                    </span>
                                )}
                                {project.role && project.company && (
                                    <span className="text-[var(--text-dim)]">·</span>
                                )}
                                {project.company && (
                                    <span className="text-xs tracking-[0.15em] uppercase font-mono text-[var(--text-muted)]">
                                        {project.company}
                                    </span>
                                )}
                            </div>
                        )}

                        <p className="text-sm tracking-[0.02em] text-[var(--text-muted)] leading-[2]">
                            {project.overview}
                        </p>
                    </div>

                    {/* My Contributions (for work projects) */}
                    {project.contributions && project.contributions.length > 0 && (
                        <>
                            <div className="border-t border-[var(--line)]" />
                            <div>
                                <h3 className="text-xs tracking-[0.3em] uppercase font-mono text-[var(--text-dim)] mb-4">
                                    My Contributions
                                </h3>
                                <div className="space-y-2.5">
                                    {project.contributions.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--accent)] shrink-0" />
                                            <p className="text-sm text-[var(--text-muted)] leading-[1.7]">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Action Links */}
                    <div className="flex flex-wrap gap-3">
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] text-xs uppercase tracking-[0.2em] font-mono font-bold hover:bg-[var(--white)] transition-colors"
                            >
                                <FaGlobe size={12} /> Live Demo
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg)] border border-[var(--line)] text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] font-mono hover:text-[var(--white)] hover:border-[var(--line-bright)] transition-colors"
                            >
                                <FaGithub size={14} /> Source Code
                            </a>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[var(--line)]" />

                    {/* Tech Stack */}
                    <div className="space-y-5">
                        <h3 className="text-xs tracking-[0.3em] uppercase font-mono text-[var(--text-dim)]">
                            Tech Stack
                        </h3>

                        {project.tech_stack?.frontend && (
                            <div>
                                <h4 className="text-[10px] tracking-[0.2em] uppercase font-mono text-[var(--accent)] mb-2">Frontend</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech_stack.frontend.map((tech, i) => (
                                        <span key={i} className="text-[11px] font-mono px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] text-[var(--text-muted)]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.tech_stack?.backend && (
                            <div>
                                <h4 className="text-[10px] tracking-[0.2em] uppercase font-mono text-[var(--accent)] mb-2">Backend</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech_stack.backend.map((tech, i) => (
                                        <span key={i} className="text-[11px] font-mono px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] text-[var(--text-muted)]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.tech_stack?.tools && (
                            <div>
                                <h4 className="text-[10px] tracking-[0.2em] uppercase font-mono text-[var(--accent)] mb-2">Tools</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech_stack.tools.map((tech, i) => (
                                        <span key={i} className="text-[11px] font-mono px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] text-[var(--text-muted)]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[var(--line)]" />

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <div>
                            <h3 className="text-xs tracking-[0.3em] uppercase font-mono text-[var(--text-dim)] mb-4">
                                Key Features
                            </h3>
                            <div className="space-y-2.5">
                                {project.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--accent)] shrink-0" />
                                        <p className="text-sm text-[var(--text-muted)] leading-[1.7]">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Admin Credentials */}
                    {project.admin_credentials && (
                        <div className="border border-[var(--line)] bg-[var(--bg)] p-4">
                            <h4 className="text-[10px] tracking-[0.2em] uppercase font-mono text-[var(--accent)] mb-3">
                                Demo Admin Access
                            </h4>
                            <div className="space-y-1.5 font-mono text-xs">
                                <div className="flex gap-2">
                                    <span className="text-[var(--text-dim)]">Email:</span>
                                    <span className="text-[var(--text-muted)]">{project.admin_credentials.email}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-[var(--text-dim)]">Pass:</span>
                                    <span className="text-[var(--text-muted)]">{project.admin_credentials.password}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectDetail;
