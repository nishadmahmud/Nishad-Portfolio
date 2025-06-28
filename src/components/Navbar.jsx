import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ]

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    const sections = sectionIds.map(id => document.getElementById(id));
    const handleScroll = () => {
      let current = 'home';
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            current = sectionIds[i];
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="backdrop-blur-md px-4 bg-white/10 border border-white/20 rounded-xl flex items-center shadow-lg h-14 lg:h-16">
            <img
              src="/logo-cropped.svg"
              alt="Nishad Logo"
              className="h-6 w-auto lg:h-8 drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 12px #0ff6)' }}
            />
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
                  className={`transition-colors duration-300 font-medium relative group px-2 
                    ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 
                    ${activeSection === item.id ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
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