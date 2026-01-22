"use client";

import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaHeart,
} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/nishadmahmud", label: "GitHub", external: true },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/nishadmahmud/", label: "LinkedIn", external: true },
        { icon: FaEnvelope, href: "#contact", label: "Email", external: false },
    ];

    return (
        <footer className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/50 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <div className="flex items-center">
                                    <img
                                        src="/logo.svg"
                                        alt="Nishad Logo"
                                        className="h-auto w-32 sm:w-40 -ml-3 sm:-ml-5 -mb-3 sm:-mb-4"
                                    />
                                </div>
                                <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
                                    Full-stack developer passionate about creating innovative
                                    digital experiences and bringing ideas to life through modern
                                    web technologies.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-3 sm:space-y-4"
                        >
                            <h3 className="text-slate-100 font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {["Home", "About", "Skills", "Projects", "Contact"].map(
                                    (link, index) => (
                                        <li key={link}>
                                            <motion.a
                                                href={`#${link.toLowerCase()}`}
                                                whileHover={{
                                                    x: 5,
                                                    color: "#f0f2f5",
                                                }}
                                                className="text-slate-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                                            >
                                                {link}
                                            </motion.a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-3 sm:space-y-4"
                        >
                            <h3 className="text-slate-100 font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                                Get In Touch
                            </h3>
                            <div className="space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-3 sm:space-x-4"
                                >
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target={social.external ? "_blank" : undefined}
                                            rel={social.external ? "noopener noreferrer" : undefined}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            viewport={{ once: true }}
                                            whileHover={{
                                                scale: 1.2,
                                                boxShadow: "0 0 10px #64748b55",
                                            }}
                                            className="p-2 sm:p-3 rounded-xl backdrop-blur-sm bg-slate-900/60 border border-slate-700 hover:border-slate-400 text-slate-400 hover:text-slate-100 transition-all duration-300"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={18} className="sm:w-5 sm:h-5" />
                                        </motion.a>
                                    ))}
                                </motion.div>
                                <p className="text-slate-400 text-xs sm:text-sm">
                                    Available for full-time opportunities & freelance projects.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 py-6 sm:py-8 border-t border-slate-700">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm"
                    >
                        <span>© {currentYear} Nishad. Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <FaHeart className="text-slate-500 sm:w-4 sm:h-4" size={12} />
                        </motion.div>
                        <span>and lots of caffeine</span>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
        </footer>
    );
};

export default Footer;
