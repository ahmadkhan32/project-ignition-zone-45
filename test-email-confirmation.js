// Test Email Confirmation Status
// Run this in browser console to check if email is confirmed

console.log('🔧 Testing Email Confirmation Status...');

async function checkEmailConfirmation() {
    try {
        // Check if Supabase is available
        if (typeof supabase === 'undefined') {
            console.error('❌ Supabase client not found');
            console.log('🔧 Make sure you are on the app page (http://localhost:8080)');
            return;
        }

        console.log('✅ Supabase client found');

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.error('❌ Session error:', sessionError);
            return;
        }

        if (session) {
            console.log('✅ User is logged in');
            console.log('📧 Email confirmed:', session.user.email_confirmed_at ? 'Yes' : 'No');
            console.log('👤 User email:', session.user.email);
            console.log('🆔 User ID:', session.user.id);
        } else {
            console.log('❌ No active session');
            console.log('🔧 User needs to login');
        }

        // Check auth state
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
            console.error('❌ User error:', userError);
            return;
        }

        if (user) {
            console.log('👤 Current user:', user.email);
            console.log('📧 Email confirmed:', user.email_confirmed_at ? 'Yes' : 'No');
            
            if (!user.email_confirmed_at) {
                console.log('🚨 ISSUE FOUND: Email not confirmed!');
                console.log('🔧 Solution: Check Gmail for confirmation email and click the link');
            } else {
                console.log('✅ Email is confirmed');
            }
        } else {
            console.log('❌ No user found');
            console.log('🔧 User needs to register and confirm email');
        }

    } catch (error) {
        console.error('❌ Error checking email confirmation:', error);
    }
}

// Test registration flow
async function testRegistrationFlow() {
    console.log('🧪 Testing Registration Flow...');
    console.log('1. Go to: http://localhost:8080/register');
    console.log('2. Fill form with Gmail address');
    console.log('3. Click "Create Account"');
    console.log('4. Check Gmail inbox for confirmation email');
    console.log('5. Click the link in the email');
    console.log('6. Should redirect to /auth/callback');
    console.log('7. Should see "Email Confirmed!" message');
    console.log('8. Try logging in with same credentials');
}

// Test login flow
async function testLoginFlow() {
    console.log('🔐 Testing Login Flow...');
    console.log('1. Go to: http://localhost:8080/login');
    console.log('2. Enter email and password');
    console.log('3. Click "Sign In"');
    console.log('4. Should redirect to dashboard');
    console.log('5. If error, check email confirmation');
}

// Check common issues
function checkCommonIssues() {
    console.log('🚨 Common Login Issues:');
    console.log('1. Email not confirmed - Check Gmail for verification email');
    console.log('2. Wrong email - Make sure email is correct');
    console.log('3. Wrong password - Make sure password is correct');
    console.log('4. Account not created - Try registering again');
    console.log('5. Supabase not configured - Check dashboard settings');
}

// Run all checks
async function runAllChecks() {
    console.log('🚀 Running All Checks...\n');
    
    await checkEmailConfirmation();
    
    console.log('\n🧪 Registration Test:');
    await testRegistrationFlow();
    
    console.log('\n🔐 Login Test:');
    await testLoginFlow();
    
    console.log('\n🚨 Common Issues:');
    checkCommonIssues();
    
    console.log('\n✅ All checks completed!');
}

// Auto-run checks
runAllChecks();

// Export for manual testing
window.authCheck = {
    checkEmailConfirmation: checkEmailConfirmation,
    testRegistration: testRegistrationFlow,
    testLogin: testLoginFlow,
    checkIssues: checkCommonIssues,
    runAll: runAllChecks
};

console.log('\n💡 Manual testing available:');
console.log('window.authCheck.runAll() - Run all checks');
console.log('window.authCheck.checkEmailConfirmation() - Check email status');
console.log('window.authCheck.testRegistration() - Test registration');
console.log('window.authCheck.testLogin() - Test login');
