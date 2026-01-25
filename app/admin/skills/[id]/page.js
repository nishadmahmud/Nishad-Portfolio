import { createClient } from '@/utils/supabase/server';
import SkillsForm from '@/components/admin/SkillsForm';
import { notFound } from 'next/navigation';

export default async function SkillEditPage({ params }) {
    const { id } = await params;
    const isNew = id === 'new';
    let skill = null;

    if (!isNew) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('skills').select('*').eq('id', id).single();

        if (error || !data) notFound();
        skill = data;
    }

    return <SkillsForm skill={skill} isNew={isNew} />;
}
