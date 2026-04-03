import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

import profileData from "@/lib/data/profile.json";
import skillsData from "@/lib/data/skills.json";
import experienceData from "@/lib/data/experience.json";
import publicationsData from "@/lib/data/publications.json";
import projectsData from "@/lib/data/projects.json";
import highlightsData from "@/lib/data/aboutHighlights.json";
import featuredData from "@/lib/data/aboutFeatured.json";

export const dynamic = 'force-dynamic';

export default async function Home() {
    // const supabase = await createClient();

    // --- SUPABASE API CALLS (COMMENTED OUT FOR ZERO-API JSON MODE) ---
    // Check for active session
    // const { data: { user } } = await supabase.auth.getUser();
    // const isAdmin = !!user;
    // 
    // const { data: profile } = await supabase.from('profile').select('*').single();
    // const { data: skills } = await supabase.from('skills').select('*').order('created_at');
    // const { data: experience } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
    // const { data: publications } = await supabase.from('publications').select('*').order('created_at', { ascending: false });
    // const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    // const { data: highlights } = await supabase.from('about_highlights').select('*').order('display_order', { ascending: true });
    // const { data: featured } = await supabase.from('about_featured').select('*').order('display_order', { ascending: true });
    // -----------------------------------------------------------------

    // Forced to false since we aren't fetching the database session
    const isAdmin = false; 

    // Use only the static JSON data mapped directly
    const activeProfile = profileData;
    const activeSkills = skillsData;
    const activeExperience = experienceData;
    const activePublications = publicationsData;
    const activeProjects = projectsData;
    const activeHighlights = highlightsData;
    const activeFeatured = featuredData;

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <div className="relative z-10">
                <Navbar />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Banner profile={activeProfile} isAdmin={isAdmin} />
                    <About profile={activeProfile} highlights={activeHighlights} featured={activeFeatured} isAdmin={isAdmin} />
                    <Skills skills={activeSkills} isAdmin={isAdmin} />
                    <Projects projects={activeProjects} isAdmin={isAdmin} />
                    <Experience experiences={activeExperience} isAdmin={isAdmin} />
                    <Publications publications={activePublications} isAdmin={isAdmin} />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
}

