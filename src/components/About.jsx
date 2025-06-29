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

  return (
    <section id="about" className="py-20 relative">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Passionate about building intuitive, efficient, and user-friendly software
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-8 mb-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-slate-100 mb-4">
            Hi, I'm Nishad Mahmud <span className="inline-block">👋</span>
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            I'm a Computer Science student passionate about building intuitive, efficient, and user-friendly software. 
            I love exploring the intersection of design and logic, whether it's through full-stack web development, 
            Java-based desktop applications, or solving complex problems with clean code.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            Currently learning and building with React, Node.js, and Firebase, while also experienced in Java, 
            JavaScript, Python, and C++. I enjoy developing visual tools, automation scripts, and educational software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
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
                  boxShadow: "0 0 20px #64748b55"
                }}
                className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-xl p-4 sm:p-6 h-full flex flex-col justify-center hover:border-slate-400 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-slate-500 to-slate-700 rounded-lg flex items-center justify-center">
                    <highlight.icon size={16} className="sm:w-5 sm:h-5 text-slate-100" />
                  </div>
                  <h4 className="text-slate-100 font-semibold text-sm sm:text-base">{highlight.title}</h4>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4 sm:mb-6">
              Projects I'm Proud Of
            </h3>
            <div className="space-y-3 sm:space-y-4">
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
                  <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-slate-100 font-semibold text-sm sm:text-base">{project.name}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm">{project.description}</p>
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