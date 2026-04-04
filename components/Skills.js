"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import all specific icons used in the DB
import { FaReact, FaNodeJs, FaPython, FaJava, FaGit, FaGithub, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { FaBrain } from 'react-icons/fa6';
import {
    SiJavascript, SiTailwindcss, SiMongodb, SiFirebase, SiExpress,
    SiC, SiCplusplus, SiVercel, SiFramer, SiTensorflow
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import SkillsForm from './admin/SkillsForm';
import AdminModal from './admin/AdminModal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Icon Mapping
const iconMap = {
    'FaReact': FaReact,
    'FaNodeJs': FaNodeJs,
    'FaPython': FaPython,
    'FaJava': FaJava,
    'FaGit': FaGit,
    'FaGithub': FaGithub,
    'FaBrain': FaBrain,
    'SiJavascript': SiJavascript,
    'SiTailwindcss': SiTailwindcss,
    'SiMongodb': SiMongodb,
    'SiFirebase': SiFirebase,
    'SiExpress': SiExpress,
    'SiC': SiC,
    'SiCplusplus': SiCplusplus,
    'SiVercel': SiVercel,
    'SiFramer': SiFramer,
    'SiTensorflow': SiTensorflow,
    'TbBrandNextjs': TbBrandNextjs,
    'SiNextdotjs': TbBrandNextjs, // Fallback mapping just in case
};

const Skills = ({ skills = [], isAdmin }) => {
    const [editingSkill, setEditingSkill] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    // Admin Handlers
    const handleEdit = (e, skill) => {
        e.stopPropagation();
        setEditingSkill(skill);
        setIsAdding(false);
        setAdminModalOpen(true);
    };

    const handleAdd = () => {
        setEditingSkill(null);
        setIsAdding(true);
        setAdminModalOpen(true);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const { error } = await supabase.from('skills').delete().eq('id', id);
            if (error) throw error;
            toast.success('Skill deleted');
            router.refresh();
        } catch (error) {
            toast.error('Delete failed: ' + error.message);
        }
    };

    const closeAdminModal = () => {
        setAdminModalOpen(false);
        setEditingSkill(null);
        setIsAdding(false);
    };

    return (
        <section id="skills" className="py-20 relative">

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <p className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 flex items-center justify-center gap-4">
                        Capabilities
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        Tools &amp;  <em>Technologies.</em>
                    </h2>
                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] max-w-2xl mx-auto leading-[2]">
                        Software, frameworks, and languages I use to bring ideas to life
                    </p>

                    {isAdmin && (
                        <div className="absolute top-0 right-0 md:right-20">
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg"
                            >
                                <FaPlus /> Add Skill
                            </button>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                >
                    {skills.map((skill) => {
                        const IconComponent = iconMap[skill.icon] || FaReact; // Fallback to React icon if missing

                        return (
                            <motion.div
                                key={skill.id || skill.name}
                                variants={itemVariants}
                                whileHover={{
                                    backgroundColor: "var(--bg3)",
                                    borderColor: "var(--line-bright)"
                                }}
                                className="group relative bg-[var(--bg2)] border border-[var(--line)] rounded-none p-3 sm:p-4 h-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-300"
                            >
                                {/* Admin Actions Overlay */}
                                {isAdmin && (
                                    <div className="absolute -top-2 -right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => handleEdit(e, skill)}
                                            className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 shadow-md"
                                            title="Edit Skill"
                                        >
                                            <FaEdit size={12} />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, skill.id)}
                                            className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-md"
                                            title="Delete Skill"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                )}

                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--bg)] border border-[var(--line)] rounded-none flex items-center justify-center transition-all duration-300 group-hover:border-[var(--line-bright)]">
                                    <IconComponent size={20} className="sm:w-6 sm:h-6 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                                </div>
                                <span className="text-[var(--white)] font-serif font-light text-sm sm:text-lg text-center sm:text-left whitespace-nowrap">{skill.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-12 sm:mt-16 text-center"
                >
                    <div className="bg-[var(--bg2)] border border-[var(--line)] rounded-none p-6 sm:p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-serif font-light text-[var(--white)] mb-4">
                            Always Learning
                        </h3>
                        <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] leading-[2]">
                            I'm constantly exploring new technologies and frameworks to stay current with industry trends.
                            Currently diving deep into cloud architecture, machine learning, and advanced React patterns.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Admin Edit Modal */}
            <AdminModal
                isOpen={adminModalOpen}
                onClose={closeAdminModal}
                title={isAdding ? "Add New Skill" : "Edit Skill"}
            >
                <SkillsForm
                    skill={editingSkill}
                    onSuccess={() => {
                        closeAdminModal();
                        router.refresh();
                    }}
                />
            </AdminModal>
        </section>
    );
};

export default Skills;
