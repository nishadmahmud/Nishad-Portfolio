import { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ProjectDetail from './ProjectDetail';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/projects.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const handleBackdropScroll = (e) => {
    const modalContent = e.currentTarget.querySelector('.modal-scrollbar');
    if (modalContent) {
      const scrollAmount = e.deltaY;
      modalContent.scrollTop += scrollAmount;
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-20">Loading projects...</div>;
  if (error) return <div className="text-center text-red-400 py-20">{error}</div>;

  return (
    <section id="projects" className="py-20 relative">
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
              Projects
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 sm:space-y-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onClick={() => openModal(project)}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter') openModal(project); }}
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-slate-400 transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0 h-full min-h-[8rem] sm:min-h-[10rem] lg:min-h-[14rem]">
                  <div
                    className="relative h-full min-h-[8rem] sm:min-h-[10rem] lg:min-h-[14rem] overflow-hidden w-full"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.5s',
                    }}
                  >
                  </div>

                  <div className="p-4 sm:p-5 lg:p-8 flex flex-col justify-center h-full">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    {project.overview && (
                      <p className="text-gray-400 text-sm sm:text-base leading-snug mb-3">
                        {project.overview}
                      </p>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.card_techs && project.card_techs.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="p-1 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm text-xs text-gray-200"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-xs sm:text-sm"
                        >
                          <FaGithub size={12} className="sm:w-4 sm:h-4" />
                          Code
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 backdrop-blur-md bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:border-cyan-400/50 transition-all duration-300 text-xs sm:text-sm"
                        >
                          <FaExternalLinkAlt size={10} className="sm:w-3 sm:h-3" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-400/20 to-slate-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {modalOpen && selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
          onWheel={handleBackdropScroll}
        >
          <button
            onClick={closeModal}
            className="fixed top-4 right-4 text-slate-300 hover:text-cyan-400 text-xl font-bold focus:outline-none z-20 bg-slate-800/90 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center border border-slate-600 hover:border-cyan-400/50 hover:bg-slate-700/90 transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
            aria-label="Close"
          >
            ✕
          </button>
          <div 
            className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-cyan-400/20 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto modal-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <ProjectDetail project={selectedProject} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects 