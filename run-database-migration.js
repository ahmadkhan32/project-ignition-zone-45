#!/usr/bin/env node

// Simple script to run the database migration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://scpdntuuikcqasmfxkeq.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcGRudHV1aWtjYWFzbWZ4a2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyNzQ4NzEsImV4cCI6MjA1MDg1MDg3MX0.8J8J8J8J8J8J8J8J8J8J8J8J8J8J8J8J8J8J8J8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🚀 Running database migration...');
  
  try {
    // Add Advanced Features columns (Boolean)
    console.log('Adding Advanced Features columns...');
    await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.scooters 
        ADD COLUMN IF NOT EXISTS smart_display BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS gps_navigation BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS mobile_app_connectivity BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS led_lighting_system BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS regenerative_braking BOOLEAN DEFAULT FALSE;
      `
    });

    // Add Technical Specifications columns (Text)
    console.log('Adding Technical Specifications columns...');
    await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.scooters 
        ADD COLUMN IF NOT EXISTS power_output TEXT,
        ADD COLUMN IF NOT EXISTS torque TEXT,
        ADD COLUMN IF NOT EXISTS weight TEXT,
        ADD COLUMN IF NOT EXISTS connectivity_mobile_app TEXT,
        ADD COLUMN IF NOT EXISTS connectivity_gps_tracking TEXT,
        ADD COLUMN IF NOT EXISTS connectivity_bluetooth TEXT;
      `
    });

    console.log('✅ Database migration completed successfully!');
    console.log('🎉 Advanced features and technical specifications are now available!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('📝 Please run the SQL manually in Supabase SQL Editor:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Copy and paste the contents of ADD_ADVANCED_COLUMNS.sql');
    console.log('3. Click "Run" to execute');
  }
}

runMigration();
