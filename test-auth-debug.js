// Test Authentication System Debug
// Run this in browser console to debug login issues

console.log('🔧 Testing Authentication System...');

// Test functions
const testAuth = {
    // Test registration
    testRegistration: async function() {
        console.log('🧪 Testing Registration...');
        console.log('1. Go to: http://localhost:8080/register');
        console.log('2. Fill form with Gmail address');
        console.log('3. Click "Create Account"');
        console.log('4. Check Gmail inbox for confirmation email');
        console.log('5. Click the link in the email');
        console.log('6. Should redirect to /auth/callback');
        console.log('7. Should see "Email Confirmed!" message');
    },

    // Test login
    testLogin: async function() {
        console.log('🔐 Testing Login...');
        console.log('1. Go to: http://localhost:8080/login');
        console.log('2. Enter email and password');
        console.log('3. Click "Sign In"');
        console.log('4. Should redirect to dashboard');
        console.log('5. If error, check email confirmation');
    },

    // Check common issues
    checkCommonIssues: function() {
        console.log('🚨 Common Login Issues:');
        console.log('1. Email not confirmed - Check Gmail for verification email');
        console.log('2. Wrong email - Make sure email is correct');
        console.log('3. Wrong password - Make sure password is correct');
        console.log('4. Account not created - Try registering again');
        console.log('5. Supabase not configured - Check dashboard settings');
    },

    // Test Supabase connection
    testSupabaseConnection: async function() {
        console.log('🔗 Testing Supabase Connection...');
        try {
            // Check if Supabase is available
            if (typeof supabase !== 'undefined') {
                console.log('✅ Supabase client found');
                
                // Test auth session
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('❌ Supabase auth error:', error);
                    return false;
                }
                
                console.log('✅ Supabase connection successful');
                console.log('📧 Email configuration should work');
                return true;
            } else {
                console.error('❌ Supabase client not found');
                console.log('🔧 Make sure Supabase is properly configured');
                return false;
            }
        } catch (error) {
            console.error('❌ Error testing Supabase:', error);
            return false;
        }
    },

    // Test email configuration
    testEmailConfig: function() {
        console.log('📧 Email Configuration Test:');
        console.log('1. Site URL should be: http://localhost:8080');
        console.log('2. Redirect URL should be: http://localhost:8080/auth/callback');
        console.log('3. Email confirmations should be enabled');
        console.log('4. SMTP should be configured (default or custom)');
        console.log('5. Check Supabase Dashboard → Authentication → Settings');
    },

    // Test complete flow
    testCompleteFlow: function() {
        console.log('🎯 Complete Test Flow:');
        console.log('1. Registration: http://localhost:8080/register');
        console.log('2. Check Gmail for confirmation email');
        console.log('3. Click email link to confirm');
        console.log('4. Login: http://localhost:8080/login');
        console.log('5. Dashboard: http://localhost:8080/dashboard');
    },

    // Debug login error
    debugLoginError: function() {
        console.log('🔧 Debug Login Error:');
        console.log('1. Check browser console for errors');
        console.log('2. Check network tab for failed requests');
        console.log('3. Check Supabase logs in dashboard');
        console.log('4. Verify email confirmation status');
        console.log('5. Try with different email/password');
    },

    // Run all tests
    runAllTests: async function() {
        console.log('🚀 Running All Authentication Tests...\n');
        
        // Test connection
        const connectionOk = await this.testSupabaseConnection();
        
        if (connectionOk) {
            console.log('\n📧 Email Configuration:');
            this.testEmailConfig();
            
            console.log('\n🧪 Registration Test:');
            this.testRegistration();
            
            console.log('\n🔐 Login Test:');
            this.testLogin();
            
            console.log('\n🎯 Complete Flow:');
            this.testCompleteFlow();
            
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
};

// Auto-run tests
testAuth.runAllTests();

// Export for manual testing
window.testAuth = testAuth;

console.log('\n💡 Manual testing available:');
console.log('window.testAuth.runAllTests() - Run all tests');
console.log('window.testAuth.testRegistration() - Test registration');
console.log('window.testAuth.testLogin() - Test login');
console.log('window.testAuth.checkCommonIssues() - Check common issues');
console.log('window.testAuth.debugLoginError() - Debug login error');
