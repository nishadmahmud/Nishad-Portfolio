import { createClient } from '@/utils/supabase/server';
import ProfileForm from '@/components/admin/ProfileForm';

export default async function ProfilePage() {
    const supabase = await createClient();
    // Assuming single profile row. If fetching multiple, select first.
    const { data: profile } = await supabase.from('profile').select('*').limit(1).single();

    return <ProfileForm profile={profile} />;
}
