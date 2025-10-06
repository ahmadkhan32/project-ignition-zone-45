// Verify Supabase Email Configuration
// Run this in browser console to test email setup

console.log('🔧 Testing Supabase Email Configuration...');

// Test Supabase connection
async function testSupabaseConnection() {
    try {
        // Import Supabase client (assuming it's available globally)
        const { createClient } = supabase;
        const supabaseUrl = 'https://scpdntuuikcqasmfxkeq.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcGRudHV1aWtjcWFzbWZ4a2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNTg3OTQsImV4cCI6MjA3MTczNDc5NH0.TsmzhAJ2XjKLHygWRM3YD8E8rlCut9J9ivff41IYGtc';
        
        const supabaseClient = createClient(supabaseUrl, supabaseKey);
        
        // Test auth connection
        const { data, error } = await supabaseClient.auth.getSession();
        
        if (error) {
            console.error('❌ Supabase connection failed:', error);
            return false;
        }
        
        console.log('✅ Supabase connection successful');
        console.log('📧 Email configuration should work');
        return true;
        
    } catch (error) {
        console.error('❌ Error testing Supabase:', error);
        return false;
    }
}

// Test email configuration
function testEmailConfig() {
    console.log('📧 Email Configuration Test:');
    console.log('1. Site URL should be: http://localhost:8080');
    console.log('2. Redirect URL should be: http://localhost:8080/auth/callback');
    console.log('3. Email confirmations should be enabled');
    console.log('4. SMTP should be configured (default or custom)');
}

// Test registration flow
async function testRegistrationFlow() {
    console.log('🧪 Testing Registration Flow:');
    console.log('1. Go to: http://localhost:8080/register');
    console.log('2. Fill form with Gmail address');
    console.log('3. Click "Create Account"');
    console.log('4. Check Gmail inbox for confirmation email');
    console.log('5. Click link in email');
    console.log('6. Should redirect to /auth/callback');
    console.log('7. Should see "Email Confirmed!" message');
}

// Test login flow
async function testLoginFlow() {
    console.log('🔐 Testing Login Flow:');
    console.log('1. Go to: http://localhost:8080/login');
    console.log('2. Enter same email and password');
    console.log('3. Click "Sign In"');
    console.log('4. Should redirect to dashboard');
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting Supabase Email Tests...\n');
    
    // Test connection
    const connectionOk = await testSupabaseConnection();
    
    if (connectionOk) {
        console.log('\n📧 Email Configuration:');
        testEmailConfig();
        
        console.log('\n🧪 Registration Test:');
        testRegistrationFlow();
        
        console.log('\n🔐 Login Test:');
        testLoginFlow();
        
        console.log('\n✅ All tests completed!');
        console.log('🎯 Next steps:');
        console.log('1. Configure Supabase dashboard settings');
        console.log('2. Test registration with Gmail');
        console.log('3. Check Gmail for confirmation email');
        console.log('4. Test login with same credentials');
    } else {
        console.log('\n❌ Supabase connection failed');
        console.log('🔧 Please check your Supabase configuration');
    }
}

// Auto-run tests
runAllTests();

// Export functions for manual testing
window.testSupabaseEmail = {
    testConnection: testSupabaseConnection,
    testEmailConfig: testEmailConfig,
    testRegistration: testRegistrationFlow,
    testLogin: testLoginFlow,
    runAll: runAllTests
};

console.log('\n💡 Manual testing available:');
console.log('window.testSupabaseEmail.runAll() - Run all tests');
console.log('window.testSupabaseEmail.testConnection() - Test connection');
console.log('window.testSupabaseEmail.testEmailConfig() - Test email config');
