import { createClient } from '@/utils/supabase/server';
import ExperienceForm from '@/components/admin/ExperienceForm';
import { notFound } from 'next/navigation';

export default async function ExperienceEditPage({ params }) {
    const { id } = await params;
    const isNew = id === 'new';
    let experience = null;

    if (!isNew) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('experience').select('*').eq('id', id).single();

        if (error || !data) project = null; // Typo in original log check, but fixing here
        if (error || !data) notFound();
        experience = data;
    }

    return <ExperienceForm experience={experience} isNew={isNew} />;
}
