import { motion } from 'framer-motion'
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'

const Banner = () => {
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
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaEnvelope, href: '#', label: 'Email' }
  ]

    return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          {/* Left: Info */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full space-y-4 lg:space-y-4 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.p
              variants={letterVariants}
              className="text-cyan-400 text-base sm:text-lg font-medium tracking-wider mb-1"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={letterVariants}
              className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-2"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Nishad
              </span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={letterVariants}
              className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-semibold text-gray-300"
            >
              Full Stack Developer
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={letterVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              Crafting digital experiences with modern technologies and creative solutions. 
              Passionate about building scalable applications and bringing ideas to life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={letterVariants}
              className="flex flex-col sm:flex-row gap-3 items-center lg:items-start pt-2 mb-2"
            >
              <motion.a
                href="#projects"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer text-sm sm:text-base"
              >
                View My Work
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:border-purple-400/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <FaDownload size={16} className="sm:w-5 sm:h-5" /> Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={letterVariants}
              className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 pt-2"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.2,
                    boxShadow: "0 0 25px rgba(0, 212, 255, 0.6)"
                  }}
                  className="p-3 sm:p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-400 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image Placeholder */}
          <div className="flex-1 w-full flex items-center justify-center lg:justify-end">
            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl flex items-center justify-center relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-2xl opacity-80 pointer-events-none"></div>
              {/* Replace src below with your image */}
              <img
                src="/img.jpg"
                alt="Nishad Mahmud"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-cover rounded-2xl z-10 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner