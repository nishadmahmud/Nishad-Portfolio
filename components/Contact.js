"use client";

import { useState } from 'react'
import { FaGithub, FaPhone, FaEnvelope, FaLinkedin, FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { toast } from 'react-hot-toast'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: 'Email',
            value: 'mahmudnishad253@gmail.com',
            href: 'mailto:mahmudnishad253@gmail.com'
        },
        {
            icon: FaPhone,
            label: 'Phone',
            value: '+8801622064993',
            href: 'tel:+8801622064993'
        },
        {
            icon: FaGithub,
            label: 'GitHub',
            value: 'github.com/nishadmahmud',
            href: 'https://github.com/nishadmahmud'
        },
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            value: 'www.linkedin.com/in/nishad-mahmud',
            href: 'https://www.linkedin.com/in/nishadmahmud/'
        }
    ]

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!serviceId || !templateId || !publicKey) {
            console.error('Missing EmailJS environment variables:', {
                serviceId: !!serviceId,
                templateId: !!templateId,
                publicKey: !!publicKey
            });
            toast.error('Email service configuration error. Please contact the administrator.');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                },
                publicKey
            );

            console.log('Email sent successfully:', result);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            toast.success('Message sent successfully!');
        } catch (error) {
            console.error('EmailJS error:', error);
            toast.error('Failed to send message. Please try again later.');
        }
        setIsSubmitting(false);
    }

    return (
        <section id="contact" className="py-20 relative">
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
                            Get In Touch
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Let's work together to bring your ideas to life
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-4 h-full"
                    >
                        <div className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-6 h-full">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 sm:mb-4">
                                Let's Connect
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                                I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out below.
                            </p>

                            <div className="space-y-2">
                                {contactInfo.map((info) => (
                                    <a
                                        key={info.label}
                                        href={info.href}
                                        className="flex items-center w-full gap-3 sm:gap-4 p-3 bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-xl hover:border-slate-400 transition-all duration-200"
                                        style={{ minHeight: '56px' }}
                                    >
                                        <span className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 shadow-sm">
                                            <info.icon size={18} className="sm:w-5 sm:h-5 text-slate-100" />
                                        </span>
                                        <span className="flex flex-col text-left">
                                            <span className="text-slate-100 font-semibold text-sm sm:text-base leading-tight">{info.label}</span>
                                            <span className="text-slate-300 text-xs sm:text-sm leading-tight break-all">{info.value}</span>
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-6 h-full">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 sm:mb-4">
                                Send Me a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-slate-100 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 transition-all duration-300 text-sm"
                                            placeholder="Your name"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-slate-100 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 transition-all duration-300 text-sm"
                                            placeholder="your.email@example.com"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-slate-100 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 transition-all duration-300 text-sm"
                                        placeholder="What's this about?"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-slate-100 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20 transition-all duration-300 resize-none text-sm"
                                        placeholder="Feel free to talk about anything..."
                                    />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 0 20px #64748b55"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-4 sm:px-6 py-3 bg-slate-700 text-slate-100 font-semibold rounded-xl hover:shadow-lg hover:bg-slate-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    <FaPaperPlane size={16} className="sm:w-5 sm:h-5" />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
