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
            {/* Minimalist background without blur globs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

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
                            className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2 lg:gap-0 mt-8 mb-1 lg:mb-0"
                        >
                            <motion.p
                                variants={letterVariants}
                                className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 sm:mb-10"
                            >
                                {profile?.landing_text}
                            </motion.p>

                            <motion.h1
                                variants={letterVariants}
                                className="font-serif font-light text-6xl sm:text-8xl lg:text-[100px] xl:text-[130px] leading-[0.92] tracking-[-0.02em] text-[var(--white)] whitespace-nowrap mb-4 sm:mb-8"
                            >
                                {profile?.full_name?.split(' ')[0]} <em className="not-italic text-[var(--accent)]">{profile?.full_name?.split(' ').slice(1).join(' ')}</em>
                            </motion.h1>
                        </motion.div>

                        <motion.h2
                            variants={letterVariants}
                            className="text-sm tracking-[0.1em] text-[var(--text-muted)] max-w-[500px] leading-[2] mx-auto lg:mx-0 mb-4"
                        >
                            {profile?.headline}
                        </motion.h2>

                        <motion.p
                            variants={letterVariants}
                            className="text-sm tracking-[0.1em] text-[var(--text-muted)] max-w-[500px] leading-[2] mx-auto lg:mx-0"
                        >
                            {profile?.bio}
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
                                className="w-full sm:w-auto text-xs uppercase tracking-[0.15em] text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--white)] px-8 py-4 transition-colors inline-block text-center"
                            >
                                View My Work
                            </motion.a>

                            <motion.a
                                href={profile?.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="w-full sm:w-auto text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] hover:text-[var(--white)] px-8 py-4 border border-[var(--line)] hover:border-[var(--line-bright)] transition-colors flex items-center justify-center gap-2"
                            >
                                <FaDownload size={14} className="sm:w-4 sm:h-4" /> Resume
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
                                    className="p-3 sm:p-4 text-[var(--text-dim)] hover:text-[var(--accent)] transition-all duration-300 group"
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

                        <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-none bg-[var(--bg2)] border border-[var(--line)] flex items-center justify-center relative overflow-hidden">
                            <Image
                                src={profile?.image_url}
                                alt={profile?.full_name}
                                width={300}
                                height={300}
                                unoptimized
                                className="w-[90%] h-[90%] object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
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
