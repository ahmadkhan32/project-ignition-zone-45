import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "../../hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      toast({
        title: "Reset email sent!",
        description: "Check your email for the password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send reset email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="bg-card shadow-2xl rounded-2xl p-8 w-full max-w-md border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email to receive a password reset link
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200">
                Password reset link has been sent to <strong>{email}</strong>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Button
              variant="outline"
              onClick={() => setEmailSent(false)}
              className="w-full"
            >
              Send Another Email
            </Button>
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/admin/login"
            className="flex items-center justify-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
