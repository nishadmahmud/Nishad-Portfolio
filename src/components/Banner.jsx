import { motion } from 'framer-motion'
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

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
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            variants={letterVariants}
            className="text-cyan-400 text-lg sm:text-xl font-medium tracking-wider"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={letterVariants}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Nishad
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={letterVariants}
            className="text-2xl sm:text-4xl lg:text-6xl font-semibold text-gray-300"
          >
            Full Stack Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={letterVariants}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with modern technologies and creative solutions. 
            Passionate about building scalable applications and bringing ideas to life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={letterVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              View My Work
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 backdrop-blur-md bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:border-purple-400/60 transition-all duration-300"
            >
              Download CV
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={letterVariants}
            className="flex justify-center items-center space-x-6 pt-12"
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
                className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-400 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-gray-400"
          >
            <span className="text-sm">Scroll Down</span>
            <FaArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Banner