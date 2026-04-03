"use client";

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'

const Navbar = () => {
    const navItems = [
        { name: 'Home', href: '#home', id: 'home' },
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Publications', href: '#publications', id: 'publications' },
        { name: 'Contact', href: '#contact', id: 'contact' }
    ]

    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const sectionIds = navItems.map(item => item.id);
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 60;
            let current = sectionIds[0];
            for (let i = 0; i < sectionIds.length; i++) {
                const section = document.getElementById(sectionIds[i]);
                if (section && scrollPosition >= section.offsetTop) {
                    current = sectionIds[i];
                }
            }
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
                current = sectionIds[sectionIds.length - 1];
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 w-full`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 lg:h-16 gap-4">
                    <div className="px-5 bg-[var(--bg)] border border-[var(--line)] rounded-none flex items-center h-10 lg:h-12">
                        <Image
                            src="/logo-nishad.svg"
                            alt="Nishad Logo"
                            width={110}
                            height={40}
                            className="h-5 lg:h-6 w-auto object-contain"
                            priority
                        />
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center">
                        <div className="bg-[var(--bg)] border border-[var(--line)] rounded-none px-8 flex items-center gap-8 h-10 lg:h-12">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`transition-colors duration-300 font-mono text-xs uppercase tracking-[0.2em] relative group px-2 py-1
                    ${activeSection === item.id ? 'text-[var(--white)]' : 'text-[var(--text-dim)] hover:text-[var(--accent)]'}`}
                                >
                                    {item.name}
                                    <span className={`absolute bottom-0 left-0 h-[1px] bg-[var(--accent)] transition-all duration-300 
                    ${activeSection === item.id ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:flex bg-[var(--bg)] border border-[var(--line)] rounded-none px-6 items-center h-10 lg:h-12 hover:bg-[var(--bg2)] transition-colors">
                        <a
                            href="/Nishad-Mahmud_Resume.pdf"
                            download
                            className="text-[var(--white)] text-xs uppercase tracking-[0.2em] h-full flex items-center justify-center transition-all duration-300"
                        >
                            Resume
                        </a>
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden bg-[var(--bg)] border border-[var(--line)] rounded-none p-3 flex items-center justify-center h-12 w-12"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className="text-[var(--white)] text-lg" />
                        ) : (
                            <FaBars className="text-[var(--white)] text-lg" />
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden mt-4 bg-[var(--bg2)] border border-[var(--line)] rounded-none p-4"
                    >
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={`px-4 py-3 rounded-none transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-mono border border-transparent
                    ${activeSection === item.id
                                            ? 'text-[var(--white)] bg-[var(--bg3)] border-[var(--line)]'
                                            : 'text-[var(--text-dim)] hover:text-[var(--accent)] hover:bg-[var(--bg3)] hover:border-[var(--line-bright)]'
                                        }`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <div className="border-t border-[var(--line)] pt-3 mt-3">
                                <a
                                    href="/Nishad-Mahmud_Resume.pdf"
                                    download
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center px-4 py-4 bg-[var(--accent)] text-[var(--bg)] text-xs uppercase tracking-[0.2em] font-bold rounded-none transition-colors hover:bg-[var(--white)]"
                                >
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}

export default Navbar
