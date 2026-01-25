import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { FaPlus, FaEdit } from 'react-icons/fa';
import DeleteButton from '@/components/admin/DeleteButton';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';

export default async function ProjectsAdminPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

    async function deleteProject(formData) {
        "use server";
        const id = formData.get('id');
        const supabase = await createClient();
        await supabase.from('projects').delete().eq('id', id);
        revalidatePath('/admin/projects');
        revalidatePath('/'); // Update public site
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                >
                    <FaPlus size={14} /> Add Project
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-400">
                        <thead className="bg-slate-800/50 text-slate-200 uppercase text-xs font-bold">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Tech Stack</th>
                                <th className="p-4 text-center">Featured</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {projects?.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 w-24">
                                        <div className="w-16 h-10 relative rounded overflow-hidden bg-slate-800">
                                            {project.image_url ? (
                                                <Image
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">No Img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-white max-w-xs truncate" title={project.title}>
                                        {project.title}
                                    </td>
                                    <td className="p-4 max-w-xs truncate">
                                        {project.tech_stack?.card_techs?.join(', ') || '-'}
                                    </td>
                                    <td className="p-4 text-center">
                                        {project.featured ? (
                                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                        ) : (
                                            <span className="inline-block w-3 h-3 bg-slate-700 rounded-full"></span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/projects/${project.id}`}
                                                className="p-2 text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                            <form action={deleteProject}>
                                                <input type="hidden" name="id" value={project.id} />
                                                <DeleteButton
                                                    className="p-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                                />
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects?.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No projects found. Create one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
