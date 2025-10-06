// Quick script to add missing columns to Supabase
import { createClient } from '@supabase/supabase-js';

// Get your Supabase credentials from environment or hardcode temporarily
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://scpdntuuikcqasmfxkeq.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcGRudHV1aWtjcWFzbWZ4a2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MDczNDUsImV4cCI6MjA0Mjk4MzM0NX0.L3VhcJPU6pGz8R8ixSPJH3xwgzfUkgOO6AHQxrYPpVg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addColumns() {
  console.log('Adding missing columns to scooters table...');
  
  const sql = `
    -- Add advanced features columns
    ALTER TABLE public.scooters 
    ADD COLUMN IF NOT EXISTS smart_display BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS gps_navigation BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS mobile_app_connectivity BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS led_lighting_system BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS regenerative_braking BOOLEAN DEFAULT FALSE;

    -- Add technical specifications columns
    ALTER TABLE public.scooters 
    ADD COLUMN IF NOT EXISTS power_output TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS torque TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS weight TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS connectivity_mobile_app TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS connectivity_gps_tracking TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS connectivity_bluetooth TEXT DEFAULT '';
  `;

  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error('Error adding columns:', error);
    console.log('\n⚠️  Please run the SQL manually in Supabase SQL Editor:');
    console.log('---------------------------------------------------');
    console.log(sql);
    console.log('---------------------------------------------------');
  } else {
    console.log('✅ Columns added successfully!');
  }
}

addColumns();
