import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaPython, FaJava, FaGit, FaGithub } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss, SiMongodb, SiFirebase, SiExpress, SiC, SiCplusplus, SiVercel, SiFramer } from 'react-icons/si'

const Skills = () => {
  const skills = [
    { name: 'React', icon: FaReact, bg: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
    { name: 'JavaScript', icon: SiJavascript, bg: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'Node.js', icon: FaNodeJs, bg: 'bg-gradient-to-br from-green-400 to-green-600' },
    { name: 'Express.js', icon: SiExpress, bg: 'bg-gradient-to-br from-gray-700 to-gray-900' },
    { name: 'MongoDB', icon: SiMongodb, bg: 'bg-gradient-to-br from-green-500 to-green-700' },
    { name: 'Firebase', icon: SiFirebase, bg: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, bg: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
    { name: 'Python', icon: FaPython, bg: 'bg-gradient-to-br from-blue-500 to-yellow-400' },
    { name: 'C', icon: SiC, bg: 'bg-gradient-to-br from-gray-400 to-gray-600' },
    { name: 'C++', icon: SiCplusplus, bg: 'bg-gradient-to-br from-blue-400 to-blue-700' },
    { name: 'Java', icon: FaJava, bg: 'bg-gradient-to-br from-red-500 to-yellow-500' },
    { name: 'JavaFX', icon: FaJava, bg: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { name: 'Framer Motion', icon: SiFramer, bg: 'bg-gradient-to-br from-black to-fuchsia-500' },
    { name: 'Git', icon: FaGit, bg: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { name: 'GitHub', icon: FaGithub, bg: 'bg-gradient-to-br from-gray-700 to-black' },
    { name: 'Vercel', icon: SiVercel, bg: 'bg-gradient-to-br from-gray-200 to-gray-800' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="py-20 relative">
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
              Skills
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 0 20px #64748b55"
              }}
              className="group relative"
            >
              <div className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-3 sm:p-4 h-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 hover:border-slate-400 transition-all duration-300">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 ${skill.bg}`}>
                  <skill.icon size={20} className="sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-slate-100 font-semibold text-sm sm:text-lg text-center sm:text-left whitespace-nowrap">{skill.name}</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-400/20 to-slate-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="backdrop-blur-md bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 sm:mb-4">
              Always Learning
            </h3>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              I'm constantly exploring new technologies and frameworks to stay current with industry trends. 
              Currently diving deep into cloud architecture, machine learning, and advanced React patterns.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills