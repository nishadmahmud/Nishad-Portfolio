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

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.3em] text-[var(--text-dim)] uppercase mb-6 flex items-center justify-center gap-4">
                        Connect
                    </p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--white)] mb-6">
                        Get In  <em>Touch.</em>
                    </h2>
                    <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] max-w-2xl mx-auto leading-[2]">
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
                        <div className="bg-[var(--bg2)] border border-[var(--line)] rounded-none p-6 sm:p-10 h-full">
                            <h3 className="text-3xl font-serif font-light text-[var(--white)] mb-4">
                                Let's Connect
                            </h3>
                            <p className="text-sm tracking-[0.04em] text-[var(--text-muted)] leading-[2] mb-8">
                                I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out below.
                            </p>

                            <div className="space-y-2">
                                {contactInfo.map((info) => (
                                    <a
                                        key={info.label}
                                        href={info.href}
                                        className="flex items-center w-full gap-4 sm:gap-6 p-4 sm:p-6 bg-transparent border border-[var(--line)] rounded-none hover:bg-[var(--bg3)] hover:border-[var(--line-bright)] transition-colors duration-300"
                                        style={{ minHeight: '80px' }}
                                    >
                                        <span className="flex items-center justify-center text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">
                                            <info.icon size={24} className="sm:w-6 sm:h-6" />
                                        </span>
                                        <span className="flex flex-col text-left">
                                            <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] mb-1">{info.label}</span>
                                            <span className="text-sm tracking-[0.04em] text-[var(--white)] leading-tight break-all font-mono">{info.value}</span>
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
                        <div className="bg-[var(--bg2)] border border-[var(--line)] rounded-none p-6 sm:p-10 h-full">
                            <h3 className="text-3xl font-serif font-light text-[var(--white)] mb-8">
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
                                        <label className="block text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] rounded-none text-[var(--text)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--line-bright)] transition-colors duration-300 text-sm tracking-[0.04em]"
                                            placeholder="Your name"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] rounded-none text-[var(--text)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--line-bright)] transition-colors duration-300 text-sm tracking-[0.04em]"
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
                                    <label className="block text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] rounded-none text-[var(--text)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--line-bright)] transition-colors duration-300 text-sm tracking-[0.04em]"
                                        placeholder="What's this about?"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--line)] rounded-none text-[var(--text)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--line-bright)] transition-colors duration-300 resize-none text-sm tracking-[0.04em]"
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
                                    whileHover={{ backgroundColor: "var(--white)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-6 py-4 bg-[var(--accent)] text-[var(--bg)] font-mono text-xs uppercase tracking-[0.2em] font-semibold rounded-none transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
