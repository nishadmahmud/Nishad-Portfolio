import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { FaPlus, FaEdit } from 'react-icons/fa';
import DeleteButton from '@/components/admin/DeleteButton';
import { revalidatePath } from 'next/cache';

export default async function ExperienceAdminPage() {
    const supabase = await createClient();
    const { data: experiences } = await supabase.from('experience').select('*').order('created_at', { ascending: false });

    async function deleteExperience(formData) {
        "use server";
        const id = formData.get('id');
        const supabase = await createClient();
        await supabase.from('experience').delete().eq('id', id);
        revalidatePath('/admin/experience');
        revalidatePath('/');
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Experience</h1>
                <Link
                    href="/admin/experience/new"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                >
                    <FaPlus size={14} /> Add Experience
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-400">
                        <thead className="bg-slate-800/50 text-slate-200 uppercase text-xs font-bold">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Period</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {experiences?.map((exp) => (
                                <tr key={exp.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 font-medium text-white">{exp.title}</td>
                                    <td className="p-4">{exp.company}</td>
                                    <td className="p-4">{exp.period}</td>
                                    <td className="p-4 text-center">
                                        {exp.is_current ? (
                                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">Current</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">Past</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/experience/${exp.id}`}
                                                className="p-2 text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                            <form action={deleteExperience}>
                                                <input type="hidden" name="id" value={exp.id} />
                                                <DeleteButton
                                                    className="p-2 text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                                />
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
