"use client";

import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-x-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/05 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Banner />
                    <About />
                    <Skills />
                    <Experience />
                    <Publications />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
}

