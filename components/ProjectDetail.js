"use client";

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectDetail = ({ project }) => {
    if (!project) return null;
    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            {project.image && (
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-56 object-cover rounded-xl mb-3 sm:mb-4 border border-white/10 shadow"
                />
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">{project.title}</h2>
            {project.live && (
                <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mb-2 text-slate-400 hover:underline text-sm sm:text-base font-medium"
                >
                    Live Website ↗
                </a>
            )}
            {project.overview && (
                <div className="mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-300 mb-1">Overview</h3>
                    <p className="text-slate-300 text-sm sm:text-base">{project.overview}</p>
                </div>
            )}
            {project.features && project.features.length > 0 && (
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-300 mb-1">Core Features</h3>
                    <ul className="list-disc list-inside text-slate-200 text-sm sm:text-base space-y-1">
                        {project.features.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>
            )}
            {project.userFeatures && project.userFeatures.length > 0 && (
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-300 mb-1">User Features</h3>
                    <ul className="list-disc list-inside text-slate-200 text-sm sm:text-base space-y-1">
                        {project.userFeatures.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>
            )}
            {project.technologies && (
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-300 mb-1">Technologies Used</h3>
                    <div className="flex flex-col gap-2">
                        {project.technologies.frontend && (
                            <div>
                                <span className="font-medium text-slate-200 text-sm sm:text-base">Frontend: </span>
                                <span className="text-slate-300 text-sm sm:text-base">{project.technologies.frontend.join(', ')}</span>
                            </div>
                        )}
                        {project.technologies.backend && (
                            <div>
                                <span className="font-medium text-slate-200 text-sm sm:text-base">Backend: </span>
                                <span className="text-slate-300 text-sm sm:text-base">{project.technologies.backend.join(', ')}</span>
                            </div>
                        )}
                        {project.technologies.tools && (
                            <div>
                                <span className="font-medium text-slate-200 text-sm sm:text-base">Tools: </span>
                                <span className="text-slate-300 text-sm sm:text-base">{project.technologies.tools.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                {project.github && project.github !== "" && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-700 text-slate-100 font-semibold rounded-lg hover:shadow-lg hover:bg-slate-600 transition-all duration-300 text-sm sm:text-base"
                    >
                        <FaGithub size={14} className="sm:w-4 sm:h-4" /> Code
                    </a>
                )}
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 backdrop-blur-md bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-600 hover:border-slate-400 transition-all duration-300 text-sm sm:text-base"
                    >
                        <FaExternalLinkAlt size={12} className="sm:w-3 sm:h-3" /> Live Demo
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
