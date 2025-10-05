import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "../../hooks/use-toast";
import { Lock } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session (coming from reset email)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsValidToken(true);
      } else {
        toast({
          title: "Invalid or expired reset link",
          description: "Please request a new password reset link.",
          variant: "destructive",
        });
        navigate("/admin/forgot-password");
      }
    });
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your password has been successfully reset.",
      });

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Failed to reset password",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="text-center">
          <p className="text-muted-foreground">Validating reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="bg-card shadow-2xl rounded-2xl p-8 w-full max-w-md border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your new password</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Updating password..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
