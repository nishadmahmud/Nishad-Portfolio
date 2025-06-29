import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ]

  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
          <div className="backdrop-blur-md px-3 sm:px-4 bg-white/10 border border-white/20 rounded-xl flex items-center shadow-lg h-12 sm:h-14 lg:h-16">
            <img
              src="/logo-cropped.svg"
              alt="Nishad Logo"
              className="h-5 w-auto sm:h-6 lg:h-8 drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 12px #0ff6)' }}
            />
          </div>

          {/* Center: Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
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

          {/* Right: Resume Button - Hidden on mobile */}
          <div className="hidden sm:flex backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 flex items-center shadow-lg h-12 sm:h-14 lg:h-16">
            <a
              href="/resume.pdf"
              download
              className="text-white font-semibold rounded-lg transition-all duration-300 h-full flex items-center justify-center px-4 hover:text-cyan-400"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 flex items-center justify-center shadow-lg h-12 w-12"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-white text-lg" />
            ) : (
              <FaBars className="text-white text-lg" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 backdrop-blur-md bg-black/80 border border-white/20 rounded-xl p-4 shadow-lg"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 font-medium
                    ${activeSection === item.id 
                      ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20' 
                      : 'text-gray-200 hover:text-cyan-400 hover:bg-white/5'
                    }`}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="border-t border-white/20 pt-3 mt-3">
                <a
                  href="/resume.pdf"
                  download
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar