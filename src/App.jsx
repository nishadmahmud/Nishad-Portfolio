import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(24,31,42,0.85)',
              color: '#f3f6fa',
              border: '1.5px solid #22d3ee',
              boxShadow: '0 0 16px 0 #22d3ee55',
              backdropFilter: 'blur(8px)',
              fontWeight: 500,
              fontFamily: 'inherit',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              letterSpacing: '0.01em',
            },
            iconTheme: {
              primary: '#22d3ee',
              secondary: '#181f2a',
            },
            success: {
              style: {
                border: '1.5px solid #22d3ee',
                boxShadow: '0 0 16px 0 #22d3ee55',
              },
              iconTheme: {
                primary: '#22d3ee',
                secondary: '#181f2a',
              },
            },
            error: {
              style: {
                border: '1.5px solid #f43f5e',
                boxShadow: '0 0 16px 0 #f43f5e55',
              },
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#181f2a',
              },
            },
          }}
        />
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Banner />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
