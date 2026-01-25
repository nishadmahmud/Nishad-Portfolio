import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { FaPlus, FaEdit } from 'react-icons/fa';
import DeleteButton from '@/components/admin/DeleteButton';
import { revalidatePath } from 'next/cache';

export default async function SkillsAdminPage() {
    const supabase = await createClient();
    const { data: skills } = await supabase.from('skills').select('*').order('created_at', { ascending: false });

    async function deleteSkill(formData) {
        "use server";
        const id = formData.get('id');
        const supabase = await createClient();
        await supabase.from('skills').delete().eq('id', id);
        revalidatePath('/admin/skills');
        revalidatePath('/');
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Skills</h1>
                <Link
                    href="/admin/skills/new"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                >
                    <FaPlus size={14} /> Add Skill
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills?.map((skill) => (
                    <div key={skill.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center gap-3 relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/skills/${skill.id}`} className="text-cyan-400 hover:text-cyan-300 p-1"><FaEdit size={12} /></Link>
                            <form action={deleteSkill}>
                                <input type="hidden" name="id" value={skill.id} />
                                <DeleteButton className="text-red-400 hover:text-red-300 p-1" size={12} confirmMessage="Delete?" />
                            </form>
                        </div>

                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl ${skill.bg_color}`}>
                            {skill.icon.slice(0, 2)}
                        </div>
                        <div className="text-center">
                            <h3 className="text-white font-medium text-sm truncate w-full">{skill.name}</h3>
                            <p className="text-slate-500 text-xs">{skill.icon}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
