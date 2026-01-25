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

export const dynamic = 'force-dynamic';

export default async function Home() {
    const supabase = await createClient();

    // Check for active session
    const { data: { user } } = await supabase.auth.getUser();
    const isAdmin = !!user;

    const { data: profile } = await supabase.from('profile').select('*').single();
    const { data: skills } = await supabase.from('skills').select('*').order('created_at');
    const { data: experience } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
    const { data: publications } = await supabase.from('publications').select('*').order('created_at', { ascending: false });
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    const { data: highlights } = await supabase.from('about_highlights').select('*').order('display_order', { ascending: true });
    const { data: featured } = await supabase.from('about_featured').select('*').order('display_order', { ascending: true });

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
                    <Banner profile={profile} isAdmin={isAdmin} />
                    <About profile={profile} highlights={highlights || []} featured={featured || []} isAdmin={isAdmin} />
                    <Skills skills={skills || []} isAdmin={isAdmin} />
                    <Experience experiences={experience || []} isAdmin={isAdmin} />
                    <Publications publications={publications || []} isAdmin={isAdmin} />
                    <Projects projects={projects || []} isAdmin={isAdmin} />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
}

