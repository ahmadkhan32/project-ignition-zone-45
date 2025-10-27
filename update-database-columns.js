import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://your-project.supabase.co'; // Replace with your actual Supabase URL
const supabaseKey = 'your-anon-key'; // Replace with your actual Supabase anon key

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDatabaseColumns() {
  try {
    console.log('Starting database column update...');
    
    // First, let's check if the old columns exist and get some sample data
    const { data: existingData, error: fetchError } = await supabase
      .from('scooters')
      .select('id, power_output, torque')
      .limit(5);
    
    if (fetchError) {
      console.log('Old columns may not exist or there was an error:', fetchError.message);
    } else {
      console.log('Found existing data:', existingData);
    }
    
    // Add new columns if they don't exist
    console.log('Adding new columns...');
    
    // Note: Supabase doesn't support direct ALTER TABLE via JavaScript client
    // You'll need to run the SQL script in the Supabase SQL editor
    
    console.log('Please run the following SQL in your Supabase SQL editor:');
    console.log(`
-- Add new columns
ALTER TABLE scooters 
ADD COLUMN IF NOT EXISTS motor_output TEXT,
ADD COLUMN IF NOT EXISTS battery TEXT;

-- Copy data from old columns to new columns (if they exist)
UPDATE scooters 
SET motor_output = power_output 
WHERE power_output IS NOT NULL AND motor_output IS NULL;

UPDATE scooters 
SET battery = torque 
WHERE torque IS NOT NULL AND battery IS NULL;

-- Add comments
COMMENT ON COLUMN scooters.motor_output IS 'Motor output specification (e.g., 3500W)';
COMMENT ON COLUMN scooters.battery IS 'Battery specification (e.g., 60V 20Ah)';
    `);
    
    // Verify the new columns exist
    const { data: newData, error: newError } = await supabase
      .from('scooters')
      .select('id, motor_output, battery')
      .limit(5);
    
    if (newError) {
      console.log('New columns not found yet. Please run the SQL script first.');
    } else {
      console.log('New columns found:', newData);
    }
    
    console.log('Database update process completed!');
    
  } catch (error) {
    console.error('Error updating database:', error);
  }
}

// Run the update
updateDatabaseColumns();
