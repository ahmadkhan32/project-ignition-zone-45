import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, LogOut, Shield } from 'lucide-react';

export default function TestAuth() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Test</h1>
          <p className="text-gray-600">Test your Supabase authentication setup</p>
        </div>

        {user ? (
          <div className="space-y-6">
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  Authenticated User
                </CardTitle>
                <CardDescription>
                  You are successfully logged in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  {user.user_metadata?.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-600">{user.user_metadata.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Member Since</p>
                      <p className="text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                      {user.email_confirmed_at ? "Email Verified" : "Email Unverified"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
              <Button onClick={() => navigate('/admin/dashboard')} variant="outline" className="w-full">
                Admin Dashboard
              </Button>
              <Button onClick={handleSignOut} variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-400" />
                  Not Authenticated
                </CardTitle>
                <CardDescription>
                  You are not logged in. Please sign in to continue.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => navigate('/login')} className="w-full">
                Sign In
              </Button>
              <Button onClick={() => navigate('/register')} variant="outline" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Test Links */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Authentication Flows</CardTitle>
            <CardDescription>
              Test all authentication features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
                Login Page
              </Button>
              <Button onClick={() => navigate('/register')} variant="outline" className="w-full">
                Register Page
              </Button>
              <Button onClick={() => navigate('/forgot-password')} variant="outline" className="w-full">
                Forgot Password
              </Button>
              <Button onClick={() => navigate('/test-otp')} variant="outline" className="w-full">
                Test OTP System
              </Button>
              <Button onClick={() => navigate('/create-test-user')} variant="outline" className="w-full">
                Create Test User
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full">
                Protected Dashboard
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                Home Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
