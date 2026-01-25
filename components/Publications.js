"use client";

import { motion } from 'framer-motion';
import { FaBook, FaExternalLinkAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Publications = () => {
    const publications = [
        {
            title: "Deep Learning-Driven Leaf Disease Classification in Indoor Plants with YOLOv11: Stable Diffusion Augmentation Approach",
            authors: ["Nishad Mahmud Opu", "Md Saiful Islam", "Sayed Hanzala Abdullah", "Ruma Akter"],
            conference: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
            shortConference: "ICCIT 2025",
            location: "Cox’s Bazar, Bangladesh",
            year: "December 2025",
            status: "Accepted",
            doi: null // No DOI provided
        },
        {
            title: "Deep Learning-Based Leaf Diseases Detection in Indoor Ornamental Plants: A Comparative Study of YOLOv8, YOLOv9, and YOLOv11",
            authors: ["Nishad Mahmud Opu", "Md Saiful Islam", "Ruma Akter", "Kazi Maisha Jannath", "Shahriar Ahmed", "Rakibul Islam Rafi"],
            conference: "2025 IEEE International Women in Engineering (WIE) Conference on Electrical and Computer Engineering (WIECON-ECE)",
            shortConference: "WIECON-ECE 2025",
            location: "Cox’s Bazar, Bangladesh",
            year: "December 2025",
            status: "Accepted",
            doi: null // No DOI provided
        },
        {
            title: "Machine Learning Approaches to Classify and Predict Water Quality Status in the Surma River, Sylhet, Bangladesh",
            authors: ["Md. Anamul Hossain Chowdhury", "Nishad Mahmud Opu", "Md Fazla Rabbi", "Nabil Mahmud Sakib", "MD Shofiur Rahman", "Pujan Dey Anik", "Rayhan Mahmud Rakib"],
            conference: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
            shortConference: "ICCIT 2025",
            location: "Cox’s Bazar, Bangladesh",
            year: "December 2025",
            status: "Accepted",
            doi: "10.13140/RG.2.2.11578.86721",
            link: "https://doi.org/10.13140/RG.2.2.11578.86721"
        },
        {
            title: "Assessment of Industrial Impacts on Surface Water Quality in Dhaka and Sylhet Rivers, Bangladesh: Using WQI and Machine Learning Models",
            authors: ["Md. Anamul Hossain Chowdhury", "Rayhan Mahmud Rakib", "Pujan Dey Anik", "Nishad Mahmud Opu", "Nabil Mahmud Sakib", "Md Fazla Rabbi", "MD Shofiur Rahman"],
            conference: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
            shortConference: "ICCIT 2025",
            location: "Cox’s Bazar, Bangladesh",
            year: "December 2025",
            status: "Accepted",
            doi: "10.13140/RG.2.2.29194.94404",
            link: "https://doi.org/10.13140/RG.2.2.29194.94404"
        },
        {
            title: "Flood Hazard Classification Using Machine Learning and a Proposed Early-Warning System for Risk Management in Sylhet City, Bangladesh",
            authors: ["Md. Anamul Hossain Chowdhury", "Pujan Dey Anik", "Rayhan Mahmud Rakib", "Nishad Mahmud Opu", "Biplob Deb Nath", "Fardous Kabir Noyon", "Rumi Chowdhury"],
            conference: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
            shortConference: "ICCIT 2025",
            location: "Cox’s Bazar, Bangladesh",
            year: "December 2025",
            status: "Accepted",
            doi: "10.13140/RG.2.2.35066.96966",
            link: "https://doi.org/10.13140/RG.2.2.35066.96966"
        }
    ];

    return (
        <section id="publications" className="py-20 relative">
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
                            Publications
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Accepted Research Papers
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {publications.map((pub, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.01,
                                boxShadow: "0 0 20px #64748b55"
                            }}
                            className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 hover:border-slate-400 transition-all duration-300"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[24px] text-cyan-400">
                                            <FaBook size={20} />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight">
                                            {pub.title}
                                        </h3>
                                    </div>
                                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/20 whitespace-nowrap shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                        {pub.status}
                                    </span>
                                </div>

                                <div className="text-slate-400 text-sm leading-relaxed pl-9">
                                    {pub.authors.map((author, i) => (
                                        <span key={i} className={author.includes("Nishad") ? "text-cyan-400 font-semibold" : ""}>
                                            {author}{i < pub.authors.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 pl-9 border-t border-slate-700/50 pt-4 mt-2">
                                    <span className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-slate-400" />
                                        {pub.year}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium text-slate-300">{pub.shortConference}</span>
                                        <span className="hidden sm:inline text-slate-500">-</span>
                                        <div className="flex items-center gap-1.5">
                                            <FaMapMarkerAlt className="text-slate-400 flex-shrink-0" />
                                            <span>{pub.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {pub.link && (
                                    <div className="pl-9 mt-1">
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-all"
                                        >
                                            <FaExternalLinkAlt size={12} />
                                            DOI: {pub.doi}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Publications;
