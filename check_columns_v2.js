const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    console.log('Checking image_url...');
    const { error: err1 } = await supabase.from('profile').select('image_url').limit(1);
    if (err1) console.log('image_url error:', err1.message);
    else console.log('image_url exists');

    console.log('Checking avatar_url...');
    const { error: err2 } = await supabase.from('profile').select('avatar_url').limit(1);
    if (err2) console.log('avatar_url error:', err2.message);
    else console.log('avatar_url exists');

    // List all just in case
    const { data } = await supabase.from('profile').select('*').limit(1);
    if (data && data[0]) {
        console.log('ALL KEYS:', JSON.stringify(Object.keys(data[0])));
    }
}

check();
