import { createClient } from '@/utils/supabase/server';
import ProjectForm from '@/components/admin/ProjectForm';
import { notFound } from 'next/navigation';

export default async function ProjectEditPage({ params }) {
    const { id } = await params;
    const isNew = id === 'new';
    let project = null;

    if (!isNew) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();

        if (error || !data) {
            notFound();
        }
        project = data;
    }

    return <ProjectForm project={project} isNew={isNew} />;
}
