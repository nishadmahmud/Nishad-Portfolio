"use client";

import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaHeart,
} from "react-icons/fa";
import { FaResearchgate } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/nishadmahmud", label: "GitHub", external: true },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/nishadmahmud/", label: "LinkedIn", external: true },
        { icon: FaResearchgate, href: "https://www.researchgate.net/profile/Nishad-Mahmud-Opu/", label: "ResearchGate", external: true },
        { icon: FaEnvelope, href: "#contact", label: "Email", external: false },
    ];

    return (
        <footer className="relative mt-20">

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-[var(--bg2)] border border-[var(--line)] rounded-none p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8">
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
                                    <h2 className="font-serif text-3xl text-[var(--white)] font-light italic tracking-widest pl-2">
                                        Nishad.
                                    </h2>
                                </div>
                                <p className="text-[var(--text-muted)] text-sm tracking-[0.04em] leading-[2] max-w-md pt-2">
                                    MERN-Stack developer passionate about creating innovative
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
                            className="space-y-6"
                        >
                            <h3 className="text-[var(--white)] font-serif font-light text-xl mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-4">
                                {["Home", "About", "Skills", "Projects", "Contact"].map(
                                    (link, index) => (
                                        <li key={link}>
                                            <motion.a
                                                href={`#${link.toLowerCase()}`}
                                                whileHover={{
                                                    x: 5,
                                                    color: "var(--white)",
                                                }}
                                                className="text-sm tracking-[0.04em] text-[var(--text-dim)] hover:text-[var(--white)] transition-colors duration-300 uppercase"
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
                            className="space-y-6"
                        >
                            <h3 className="text-[var(--white)] font-serif font-light text-xl mb-4">
                                Get In Touch
                            </h3>
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-4"
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
                                            className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-all duration-300"
                                            aria-label={social.label}
                                        >
                                            <social.icon size={20} className="sm:w-6 sm:h-6" />
                                        </motion.a>
                                    ))}
                                </motion.div>
                                <p className="text-[var(--text-muted)] text-sm tracking-[0.04em] leading-[2]">
                                    Available for full-time opportunities & freelance projects.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 py-8 border-t border-[var(--line)]">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-[var(--text-dim)] text-xs uppercase tracking-[0.2em]"
                    >
                        <span>© {currentYear} Nishad.</span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
