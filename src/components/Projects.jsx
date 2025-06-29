import { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiMongodb } from 'react-icons/si'
import ProjectDetail from './ProjectDetail';
import { motion } from 'framer-motion';

const techIconMap = {
  react: FaReact,
  typescript: SiTypescript,
  nodejs: FaNodeJs,
  mongodb: SiMongodb,
  tailwindcss: SiTailwindcss,
  database: FaDatabase,
};

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

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(() => {
                        const techList = [
                          ...(project.technologies?.frontend || []),
                          ...(project.technologies?.backend || []),
                          ...(project.technologies?.tools || [])
                        ];
                        return techList.slice(0, 4).map((tech, techIndex) => {
                          const TechIcon = techIconMap[tech.toLowerCase()] || null;
                          return (
                            <div
                              key={techIndex}
                              className="p-1 rounded-md bg-white/10 border border-white/20 backdrop-blur-sm text-xs"
                            >
                              {TechIcon ? <TechIcon size={12} className="sm:w-4 sm:h-4 text-cyan-400" /> : <span className="text-xs text-gray-200">{tech}</span>}
                            </div>
                          );
                        });
                      })()}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                      {project.github && (
                        <motion.a
                          href={project.github}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-cyan-400/20 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto p-4 sm:p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-cyan-400 text-2xl font-bold focus:outline-none z-10"
              aria-label="Close"
            >
              &times;
            </button>
            <ProjectDetail project={selectedProject} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects 