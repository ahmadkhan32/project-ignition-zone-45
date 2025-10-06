import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthCallback() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
          setSuccess(false);
        } else if (data.session) {
          console.log('Email confirmed successfully!');
          setSuccess(true);
          setError(null);
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          setError('No session found. Please try logging in again.');
          setSuccess(false);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {success ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-green-700">
                Email Confirmed!
              </CardTitle>
              <CardDescription className="text-green-600">
                Your email has been successfully verified. You can now access your account.
              </CardDescription>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-red-700">
                Verification Failed
              </CardTitle>
              <CardDescription className="text-red-600">
                {error || 'There was an issue verifying your email. Please try again.'}
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Redirecting to dashboard in a few seconds...
              </p>
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/login')} 
                className="w-full"
              >
                Try Logging In
              </Button>
              <Button 
                onClick={() => navigate('/register')} 
                variant="outline" 
                className="w-full"
              >
                Register Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
