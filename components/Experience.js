"use client";

import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            title: "Frontend Developer",
            company: "Squad Innovators",
            companyUrl: "https://www.squadinnovators.com/",
            period: "January 2026 - Present",
            current: true,
            description: "Building modern web applications and user interfaces with React and Next.js. Contributing to client projects with a focus on performance and user experience."
        },
        {
            title: "Frontend Developer Intern",
            company: "Squad Innovators",
            companyUrl: "https://www.squadinnovators.com/",
            period: "October 2025 - December 2025",
            current: false,
            description: "Started my professional journey learning industry best practices and contributing to real-world projects alongside senior developers."
        }
    ];

    return (
        <section id="experience" className="py-20 relative">
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
                            My Experience
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Professional experience and career milestones
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="max-w-2xl mx-auto relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-slate-600 to-slate-700"></div>

                    <div className="space-y-10">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.title + exp.period}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="relative flex items-start gap-6 pl-10 sm:pl-12"
                            >
                                {/* Timeline Dot */}
                                <motion.div
                                    className="absolute left-0 top-1"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${exp.current
                                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/40'
                                        : 'bg-slate-700'
                                        }`}>
                                        <FaBriefcase className="text-white text-xs sm:text-sm" />
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="flex-1">
                                    <span className="text-sm text-slate-500">{exp.period}</span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
                                        {exp.title}
                                    </h3>
                                    <a
                                        href={exp.companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mt-1"
                                    >
                                        {exp.company}
                                        <span className="text-xs">↗</span>
                                    </a>
                                    <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
