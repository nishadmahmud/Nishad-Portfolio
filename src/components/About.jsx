import { motion } from 'framer-motion'
import { FaGraduationCap, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa'

const About = () => {
  const highlights = [
    {
      icon: FaGraduationCap,
      title: "Computer Science Student",
      description: "Currently pursuing Computer Science with a passion for software development and problem-solving."
    },
    {
      icon: FaCode,
      title: "Full-Stack Developer",
      description: "Experienced in building web applications with React, Node.js, and modern technologies."
    },
    {
      icon: FaLightbulb,
      title: "Problem Solver",
      description: "Love exploring algorithms, software architecture, and creating intuitive user experiences."
    },
    {
      icon: FaRocket,
      title: "Always Learning",
      description: "Currently learning React, Node.js, Firebase, and exploring new technologies."
    }
  ]

  const skills = [
    "Java", "JavaScript", "Python", "C++", "React", "Node.js", 
    "Firebase", "MongoDB", "Express.js", "TailwindCSS", "Git"
  ]

  return (
    <section id="about" className="py-20 relative">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate about building intuitive, efficient, and user-friendly software
          </p>
        </motion.div>

        {/* Main Details - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Hi, I'm Nishad Mahmud <span className="inline-block">👋</span>
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            I'm a Computer Science student passionate about building intuitive, efficient, and user-friendly software. 
            I love exploring the intersection of design and logic, whether it's through full-stack web development, 
            Java-based desktop applications, or solving complex problems with clean code.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Currently learning and building with React, Node.js, and Firebase, while also experienced in Java, 
            JavaScript, Python, and C++. I enjoy developing visual tools, automation scripts, and educational software.
          </p>
        </motion.div>

        {/* Highlights + Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Highlights 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)"
                }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 h-full flex flex-col justify-center hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <highlight.icon size={20} className="text-white" />
                  </div>
                  <h4 className="text-white font-semibold">{highlight.title}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Projects I'm Proud Of */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 h-full flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Projects I'm Proud Of
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Logic Gates Simulator",
                  description: "Java-based tool to design and simulate digital circuits"
                },
                {
                  name: "Plantopia",
                  description: "Full-stack e-commerce platform for gardening and plant care"
                },
                {
                  name: "Algorithm Visualizer",
                  description: "Interactive tool for visualizing data structures and algorithms"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold">{project.name}</h4>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 