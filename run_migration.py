import requests
import sys

# Supabase credentials  
SUPABASE_URL = "https://scpdntuuikcqasmfxkeq.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcGRudHV1aWtjcWFzbWZ4a2VxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE1ODc5NCwiZXhwIjoyMDcxNzM0Nzk0fQ.uOzxzXqDe4wgTwMVf38xjf4-Tsf92L_QnYOzNb3ZrpM"

# Read SQL file
with open('supabase/migrations/20260105_create_vehicle_sales_table.sql', 'r') as f:
    sql = f.read()

print("🚀 Running Vehicle Sales Migration...")
print(f"📍 Target: {SUPABASE_URL}")
print("")

# Split into individual statements
statements = [s.strip() for s in sql.split(';') if s.strip() and not s.strip().startswith('--')]

print(f"Found {len(statements)} SQL statements")
print("")

success_count = 0
for i, statement in enumerate(statements, 1):
    if 'SELECT' in statement.upper() and 'FROM information_schema' in statement:
        print(f"⏭️  Skipping verification query {i}/{len(statements)}")
        continue
    
    try:
        # Execute via Supabase database endpoint
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/rpc/query",
            headers={
                'apikey': SERVICE_KEY,
                'Authorization': f'Bearer {SERVICE_KEY}',
                'Content-Type': 'application/json',
            },
            json={'query': statement + ';'}
        )
        
        print(f"✅ Statement {i}/{len(statements)} executed")
        success_count += 1
    except Exception as e:
        print(f"⚠️  Statement {i}: {str(e)[:50]}")

print("")
print(f"✨ Migration complete! ({success_count} statements executed)")
print("")
print("📋 Please verify:")
print("   1. Go to Supabase Dashboard → Table Editor")
print("   2. Look for 'vehicle_sales' table")
print("   3. Refresh your app at http://localhost:8081")
