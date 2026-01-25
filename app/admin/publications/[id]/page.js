import { createClient } from '@/utils/supabase/server';
import PublicationsForm from '@/components/admin/PublicationsForm';
import { notFound } from 'next/navigation';

export default async function PublicationEditPage({ params }) {
    const { id } = await params;
    const isNew = id === 'new';
    let publication = null;

    if (!isNew) {
        const supabase = await createClient();
        const { data, error } = await supabase.from('publications').select('*').eq('id', id).single();

        if (error || !data) notFound();
        publication = data;
    }

    return <PublicationsForm publication={publication} isNew={isNew} />;
}
