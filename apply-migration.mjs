import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://scpdntuuikcqasmfxkeq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcGRudHV1aWtjcWFzbWZ4a2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MDczNDUsImV4cCI6MjA0Mjk4MzM0NX0.L3VhcJPU6pGz8R8ixSPJH3xwgzfUkgOO6AHQxrYPpVg';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔧 Attempting to add columns to scooters table...\n');

// Try to add a test column first to see if we have permission
const testQuery = `
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT FALSE;
`;

console.log('Testing if we can add columns...');
console.log('\n⚠️  Note: This might not work with the anon key.');
console.log('If it fails, please run the SQL manually in Supabase Dashboard.\n');

console.log('📋 COPY THIS SQL AND RUN IT IN SUPABASE SQL EDITOR:\n');
console.log('👉 https://supabase.com/dashboard/project/scpdntuuikcqasmfxkeq/sql/new\n');
console.log('═'.repeat(60));

const sql = fs.readFileSync('ADD_COLUMNS.sql', 'utf8');
console.log(sql);
console.log('═'.repeat(60));

console.log('\n✅ After running the SQL above, your app will work!\n');
