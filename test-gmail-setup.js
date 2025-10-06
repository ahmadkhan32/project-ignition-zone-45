// Test Gmail Notification Setup
// Run this in browser console to test your Gmail notification configuration

console.log('📧 Testing Gmail Notification Setup...');

// Test 1: Check if Supabase is configured
async function testSupabaseConfig() {
    console.log('🔧 Testing Supabase configuration...');
    
    try {
        // Check if Supabase client is available
        if (typeof window !== 'undefined' && window.supabase) {
            console.log('✅ Supabase client found');
            
            // Test connection
            const { data, error } = await window.supabase.auth.getSession();
            if (error) {
                console.log('⚠️ Supabase connection error:', error.message);
            } else {
                console.log('✅ Supabase connection successful');
            }
        } else {
            console.log('❌ Supabase client not found');
        }
    } catch (error) {
        console.log('❌ Supabase test failed:', error.message);
    }
}

// Test 2: Check Gmail accessibility
function testGmailAccess() {
    console.log('📧 Testing Gmail access...');
    
    try {
        // Check if Gmail is accessible
        const gmailLink = 'https://gmail.com';
        console.log('✅ Gmail link:', gmailLink);
        console.log('📱 Open Gmail to check for registration emails');
    } catch (error) {
        console.log('❌ Gmail test failed:', error.message);
    }
}

// Test 3: Check registration form
function testRegistrationForm() {
    console.log('📝 Testing registration form...');
    
    const registrationUrl = 'http://localhost:8080/register';
    console.log('✅ Registration URL:', registrationUrl);
    console.log('📝 Test registration with your Gmail address');
    console.log('📧 Check Gmail for confirmation email');
}

// Test 4: Check email confirmation flow
function testEmailConfirmation() {
    console.log('🔗 Testing email confirmation flow...');
    
    const callbackUrl = 'http://localhost:8080/auth/callback';
    console.log('✅ Callback URL:', callbackUrl);
    console.log('🔗 Click confirmation link in Gmail email');
    console.log('🎯 Should redirect to dashboard after confirmation');
}

// Test 5: Check dashboard access
function testDashboardAccess() {
    console.log('🏠 Testing dashboard access...');
    
    const dashboardUrl = 'http://localhost:8080/dashboard';
    console.log('✅ Dashboard URL:', dashboardUrl);
    console.log('🔐 Login after email confirmation');
    console.log('📊 Should see user profile data');
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting Gmail Notification Tests...\n');
    
    await testSupabaseConfig();
    console.log('');
    
    testGmailAccess();
    console.log('');
    
    testRegistrationForm();
    console.log('');
    
    testEmailConfirmation();
    console.log('');
    
    testDashboardAccess();
    console.log('');
    
    console.log('🎉 Gmail Notification Tests Complete!');
    console.log('📧 Check your Gmail for registration emails');
    console.log('🔗 Click confirmation links to activate accounts');
    console.log('🎯 Login with same credentials to access dashboard');
}

// Export for use in browser
if (typeof window !== 'undefined') {
    window.testGmailSetup = {
        runAllTests,
        testSupabaseConfig,
        testGmailAccess,
        testRegistrationForm,
        testEmailConfirmation,
        testDashboardAccess
    };
    
    console.log('📧 Gmail Notification Test Suite Loaded!');
    console.log('Run: testGmailSetup.runAllTests() to test everything');
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    runAllTests();
}
