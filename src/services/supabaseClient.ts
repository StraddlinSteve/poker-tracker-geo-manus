import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://mkwujybvoamueuppkyvd.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd3VqeWJ2b2FtdWV1cHBreXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjU0NzQsImV4cCI6MjA2MzQ0MTQ3NH0.pIMuH5lSoZHwBuiAJkH1UWkkfheZLgwbfzBbYcrjvyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey );
