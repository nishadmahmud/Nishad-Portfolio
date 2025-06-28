import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/nishadmahmud", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/nishadmahmud/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:mahmudnishad253@gmail.com", label: "Email" },
  ];

    return (
    <footer className="relative mt-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
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
                    className="h-auto w-40 -ml-5 -mb-4"
                  />
                </div>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                  Full-stack developer passionate about creating innovative
                  digital experiences and bringing ideas to life through modern
                  web technologies.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-lg mb-4">
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
                          color: "#00d4ff",
                        }}
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                      >
                        {link}
                      </motion.a>
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-lg mb-4">
                Get In Touch
              </h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.2,
                        boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
                      }}
                      className="p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-cyan-400/50 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>
                <p className="text-gray-400 text-sm">
                  Available for full-time opportunities & freelance projects.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-8 border-t border-white/10">

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-gray-400 text-sm"
          >
            <span>© {currentYear} Nishad. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-blue-500" size={14} />
            </motion.div>
            <span>and lots of caffeine</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
    </footer>
    );
};

export default Footer;
