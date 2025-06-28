import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Left: Logo */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 flex items-center shadow-lg h-14 lg:h-16">
            <span
              className="text-xl lg:text-2xl font-black tracking-wider text-white drop-shadow-lg uppercase"
              style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em' }}
            >
              <span className="inline-block transform -rotate-2">N</span>
              <span className="inline-block mx-0.5 scale-y-110">I</span>
              <span className="inline-block transform rotate-1">S</span>
              <span className="inline-block mx-0.5 -translate-y-1">H</span>
              <span className="inline-block transform -rotate-1 scale-x-105">A</span>
              <span className="inline-block mx-0.5 translate-y-1">D</span>
            </span>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex-1 flex justify-center">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-2 flex items-center gap-6 shadow-lg">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(0, 212, 255, 0.8)"
                  }}
                  className="text-gray-200 hover:text-cyan-400 transition-colors duration-300 font-medium relative group px-2"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Resume Button */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 flex items-center shadow-lg h-14 lg:h-16">
            <a
              href="/resume.pdf"
              download
              className="text-white font-semibold rounded-lg transition-all duration-300 h-full flex items-center justify-center px-4 hover:text-cyan-400"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar