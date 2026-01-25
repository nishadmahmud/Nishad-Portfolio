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
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Publications', href: '#publications', id: 'publications' },
        { name: 'Projects', href: '#projects', id: 'projects' },
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
                <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
                    <div className="backdrop-blur-md px-3 sm:px-4 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center shadow-lg h-12 sm:h-14 lg:h-16">
                        <Image
                            src="/logo-cropped.svg"
                            alt="Nishad Logo"
                            width={32}
                            height={32}
                            unoptimized
                            className="h-5 w-auto sm:h-6 lg:h-8 drop-shadow-lg"
                            style={{ filter: 'drop-shadow(0 0 12px #888)' }}
                        />
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center">
                        <div className="backdrop-blur-md bg-slate-900/80 border border-slate-700 rounded-xl px-6 py-2 flex items-center gap-6 shadow-lg">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        textShadow: "0 0 10px #64748b"
                                    }}
                                    className={`transition-colors duration-300 font-medium relative group px-2 
                    ${activeSection === item.id ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-slate-500 transition-all duration-300 
                    ${activeSection === item.id ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:flex backdrop-blur-md bg-slate-900/80 border border-slate-700 rounded-xl px-4 flex items-center shadow-lg h-12 sm:h-14 lg:h-16">
                        <a
                            href="/Nishad-Mahmud_Resume.pdf"
                            download
                            className="text-slate-100 font-semibold rounded-lg transition-all duration-300 h-full flex items-center justify-center px-4 hover:text-slate-300"
                        >
                            Resume
                        </a>
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden backdrop-blur-md bg-slate-900/80 border border-slate-700 rounded-xl p-3 flex items-center justify-center shadow-lg h-12 w-12"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className="text-slate-200 text-lg" />
                        ) : (
                            <FaBars className="text-slate-200 text-lg" />
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden mt-4 backdrop-blur-md bg-slate-900/95 border border-slate-700 rounded-xl p-4 shadow-lg"
                    >
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={`px-4 py-3 rounded-lg transition-all duration-300 font-medium
                    ${activeSection === item.id
                                            ? 'text-slate-100 bg-slate-700/40 border border-slate-500'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                        }`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <div className="border-t border-slate-700 pt-3 mt-3">
                                <a
                                    href="/Nishad-Mahmud_Resume.pdf"
                                    download
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-center px-4 py-3 bg-slate-700 text-slate-100 font-semibold rounded-lg transition-all duration-300 hover:bg-slate-600 hover:text-white"
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
