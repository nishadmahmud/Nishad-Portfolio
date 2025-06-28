import { motion } from 'framer-motion'
import { 
  FaReact, FaNodeJs, FaPython, FaDatabase, 
  FaAws, FaDocker, FaGit, FaFigma
} from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb } from 'react-icons/si'

const Skills = () => {
  const skills = [
    { name: 'React', icon: FaReact, level: 90, color: 'from-cyan-400 to-blue-500' },
    { name: 'JavaScript', icon: SiJavascript, level: 85, color: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', icon: SiTypescript, level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', icon: FaNodeJs, level: 85, color: 'from-green-400 to-green-600' },
    { name: 'Python', icon: FaPython, level: 75, color: 'from-blue-500 to-yellow-500' },
    { name: 'MongoDB', icon: SiMongodb, level: 80, color: 'from-green-500 to-green-700' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: 'from-cyan-400 to-blue-500' },
    { name: 'AWS', icon: FaAws, level: 70, color: 'from-orange-400 to-orange-600' },
    { name: 'Docker', icon: FaDocker, level: 75, color: 'from-blue-500 to-blue-700' },
    { name: 'Git', icon: FaGit, level: 85, color: 'from-orange-500 to-red-500' },
    { name: 'Figma', icon: FaFigma, level: 70, color: 'from-purple-400 to-pink-500' },
    { name: 'SQL', icon: FaDatabase, level: 80, color: 'from-blue-400 to-indigo-500' }
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
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)"
              }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 h-full hover:border-cyan-400/50 transition-all duration-300">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                    <skill.icon size={32} className="text-white" />
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-white font-semibold text-center mb-4 text-lg">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-cyan-400 font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
                    />
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Always Learning
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
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