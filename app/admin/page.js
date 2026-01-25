import { createClient } from '@/utils/supabase/server';
import { FaProjectDiagram, FaBriefcase, FaBook, FaCode } from 'react-icons/fa';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch counts
    const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    const { count: experienceCount } = await supabase.from('experience').select('*', { count: 'exact', head: true });
    const { count: skillsCount } = await supabase.from('skills').select('*', { count: 'exact', head: true });
    const { count: publicationsCount } = await supabase.from('publications').select('*', { count: 'exact', head: true });

    const stats = [
        { name: 'Total Projects', value: projectsCount || 0, icon: FaProjectDiagram, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        { name: 'Experience Entries', value: experienceCount || 0, icon: FaBriefcase, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { name: 'Total Skills', value: skillsCount || 0, icon: FaCode, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { name: 'Publications', value: publicationsCount || 0, icon: FaBook, color: 'text-green-400', bg: 'bg-green-500/10' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome back to your portfolio control center.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start justify-between hover:border-slate-700 transition-colors">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">{stat.name}</p>
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions or Recent Activity could go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px]">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Hints</h2>
                    <ul className="space-y-3 text-slate-400">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                            Use the sidebar to manage different sections.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            Upload images directly when adding projects.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                            Use JSON format for complex lists (features, user features).
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
