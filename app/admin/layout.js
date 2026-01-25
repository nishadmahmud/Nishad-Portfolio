import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaProjectDiagram, FaBriefcase, FaBook, FaCode, FaUser } from 'react-icons/fa';

export const dynamic = 'force-dynamic'; // Force dynamic rendering for admin section

export default async function AdminLayout({ children }) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase.from('profile').select('*').single();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: FaHome },
        { name: 'Projects', href: '/admin/projects', icon: FaProjectDiagram },
        { name: 'Experience', href: '/admin/experience', icon: FaBriefcase },
        { name: 'Skills', href: '/admin/skills', icon: FaCode },
        { name: 'Publications', href: '/admin/publications', icon: FaBook },
        { name: 'Profile', href: '/admin/profile', icon: FaUser },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex text-slate-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"></div>
                    <span className="font-bold text-xl">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium"
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs overflow-hidden relative">
                            {profile?.image_url ? (
                                <img src={profile.image_url} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                user.email[0].toUpperCase()
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{profile?.full_name || user.email}</p>
                            <p className="text-xs text-slate-500">Admin</p>
                        </div>
                    </div>

                    <form action="/auth/signout" method="post" className="mt-2">
                        <button className="w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg text-left transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
