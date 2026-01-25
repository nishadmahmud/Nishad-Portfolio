"use client";

import { useState } from 'react';
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaEdit, FaCamera, FaFileAlt } from 'react-icons/fa'
import Image from 'next/image'
import ProfileForm from './admin/ProfileForm';
import AdminModal from './admin/AdminModal';
import { useRouter } from 'next/navigation';

const Banner = ({ profile, isAdmin }) => {
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('hero_text'); // 'hero_text', 'image', 'resume'
    const router = useRouter();

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    }

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    }

    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/nishadmahmud', label: 'GitHub' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/nishadmahmud/', label: 'LinkedIn' },
        { icon: FaEnvelope, href: '#contact', label: 'Email' }
    ]

    const handleEdit = (mode) => {
        setModalMode(mode);
        setAdminModalOpen(true);
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-slate-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 relative group">

                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-1 w-full space-y-4 lg:space-y-4 text-center lg:text-left order-2 lg:order-1 relative group/text"
                    >
                        {/* Admin Edit Text Button */}
                        {isAdmin && (
                            <div className="absolute -top-8 left-0 lg:-left-8 z-30 opacity-0 group-hover/text:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit('hero_text')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 shadow-md transition-all"
                                >
                                    <FaEdit /> Edit Text
                                </button>
                            </div>
                        )}

                        <motion.div
                            variants={letterVariants}
                            className="flex flex-row lg:flex-col items-center justify-center lg:items-start lg:justify-start gap-2 lg:gap-0 mb-1 lg:mb-0"
                        >
                            <motion.p
                                variants={letterVariants}
                                className="text-slate-400 text-base sm:text-lg font-medium tracking-wider lg:mb-1"
                            >
                                {profile?.landing_text || "Hello, I'm"}
                            </motion.p>

                            <motion.h1
                                variants={letterVariants}
                                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-100 leading-tight lg:mb-2 tracking-tight"
                            >
                                <span className="bg-gradient-to-r from-slate-400 via-slate-500 to-slate-700 bg-clip-text text-transparent">
                                    {profile?.full_name || "Nishad"}
                                </span>
                            </motion.h1>
                        </motion.div>

                        <motion.h2
                            variants={letterVariants}
                            className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-semibold text-slate-300"
                        >
                            {profile?.headline || "Full Stack Developer"}
                        </motion.h2>

                        <motion.p
                            variants={letterVariants}
                            className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            {profile?.bio || "Crafting digital experiences with modern technologies and creative solutions."}
                        </motion.p>

                        <motion.div
                            variants={letterVariants}
                            className="flex flex-col sm:flex-row gap-3 items-center lg:items-start pt-2 mb-2 relative group/buttons"
                        >
                            {/* Admin Edit Resume Button */}
                            {isAdmin && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 z-30 opacity-0 group-hover/buttons:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit('resume')}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 shadow-md transition-all"
                                    >
                                        <FaFileAlt /> Update Resume
                                    </button>
                                </div>
                            )}

                            <motion.a
                                href="#projects"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 20px #64748b55"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-700 text-slate-100 font-semibold rounded-xl backdrop-blur-sm border border-slate-600 hover:border-slate-400 transition-all duration-300 shadow-lg shadow-slate-700/25 cursor-pointer text-sm sm:text-base"
                            >
                                View My Work
                            </motion.a>

                            <motion.a
                                href={profile?.resume_url || "/Nishad-Mahmud_Resume.pdf"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={!profile?.resume_url}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 20px #33415555"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md bg-slate-800 text-slate-100 font-semibold rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                            >
                                <FaDownload size={16} className="sm:w-5 sm:h-5" /> Resume
                            </motion.a>
                        </motion.div>

                        <motion.div
                            variants={letterVariants}
                            className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 pt-2"
                        >
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? "_blank" : undefined}
                                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                    whileHover={{
                                        scale: 1.2,
                                        boxShadow: "0 0 15px #64748b"
                                    }}
                                    className="p-3 sm:p-4 rounded-xl backdrop-blur-md bg-slate-800 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-slate-100 transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} className="sm:w-6 sm:h-6" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <div className="flex-1 w-full flex items-center justify-center lg:justify-end order-1 lg:order-2 group/image relative">
                        {/* Admin Edit Image Button */}
                        {isAdmin && (
                            <div className="absolute top-4 right-4 z-40 opacity-0 group-hover/image:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit('image')}
                                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 shadow-xl transition-all hover:scale-110"
                                    title="Change Profile Photo"
                                >
                                    <FaCamera size={20} />
                                </button>
                            </div>
                        )}

                        <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-3xl backdrop-blur-lg bg-slate-800 border border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-700/20 to-slate-900/20 blur-2xl opacity-80 pointer-events-none"></div>
                            <Image
                                src={profile?.image_url || "/img.jpg"}
                                alt={profile?.full_name || "Nishad Mahmud"}
                                width={300}
                                height={300}
                                unoptimized
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-cover rounded-2xl z-10 shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Edit Modal */}
            <AdminModal
                isOpen={adminModalOpen}
                onClose={() => setAdminModalOpen(false)}
                title={modalMode === 'hero_text' ? "Edit Text" : "Edit Details"}
            >
                <ProfileForm
                    profile={profile}
                    mode={modalMode}
                    onSuccess={() => {
                        setAdminModalOpen(false);
                        router.refresh();
                    }}
                />
            </AdminModal>
        </section>
    )
}

export default Banner
