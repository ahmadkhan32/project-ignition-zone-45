const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read environment variables from .env.local if it exists
try {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (err) {
  console.log('No .env.local file found, using default values');
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://scpdntuuikcqasmfxkeq.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcGRudHV1aWtjcWFzbWZ4a2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MDczNDUsImV4cCI6MjA0Mjk4MzM0NX0.L3VhcJPU6pGz8R8ixSPJH3xwgzfUkgOO6AHQxrYPpVg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('\n🚀 Starting migration to add columns...\n');
  
  // Read the SQL file
  const sql = fs.readFileSync('ADD_COLUMNS.sql', 'utf8');
  
  console.log('SQL to execute:');
  console.log('-----------------------------------');
  console.log(sql);
  console.log('-----------------------------------\n');

  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Found ${statements.length} SQL statements\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { 
        sql_query: statement 
      });

      if (error) {
        console.error(`❌ Error on statement ${i + 1}:`, error.message);
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    } catch (err) {
      console.error(`❌ Exception on statement ${i + 1}:`, err.message);
    }
  }

  console.log('\n⚠️  The RPC method might not be available.');
  console.log('\n📋 MANUAL STEPS REQUIRED:\n');
  console.log('1. Go to: https://supabase.com/dashboard/project/scpdntuuikcqasmfxkeq/editor');
  console.log('2. Click "SQL Editor" in the left sidebar');
  console.log('3. Click "New Query"');
  console.log('4. Copy and paste the SQL from ADD_COLUMNS.sql');
  console.log('5. Click "Run" button\n');
  console.log('✅ After running the SQL, your app will work perfectly!\n');
}

runMigration();
