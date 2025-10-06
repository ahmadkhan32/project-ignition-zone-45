import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Phone, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [phone, setPhone] = useState("");

  const { sendOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    if (phoneParam) {
      setPhone(phoneParam);
    } else {
      navigate('/register');
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!otp || otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const { error } = await verifyOTP(phone, otp);
      
      if (error) {
        throw error;
      }

      setMessage("Phone number verified successfully!");
      setMessageType("success");
      toast.success("Phone number verified successfully!");
      
      // Navigate to login page since OTP verification doesn't create a session
      navigate("/login");
      
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setMessage(error.message || "Invalid OTP. Please try again.");
      setMessageType("error");
      toast.error(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setMessage("");

    try {
      const { error } = await sendOTP(phone);
      
      if (error) {
        throw error;
      }

      setMessage("OTP sent successfully! Please check your phone.");
      setMessageType("success");
      setCountdown(60);
      setCanResend(false);
      toast.success("OTP sent successfully!");
      
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      setMessage(error.message || "Failed to resend OTP");
      setMessageType("error");
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/register")}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Phone Number
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            We've sent a 6-digit verification code to <strong>{phone}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <Alert className={`${
              messageType === "success" ? "border-green-200 bg-green-50" :
              messageType === "error" ? "border-red-200 bg-red-50" :
              "border-blue-200 bg-blue-50"
            }`}>
              <AlertDescription className={`${
                messageType === "success" ? "text-green-800" :
                messageType === "error" ? "text-red-800" :
                "text-blue-800"
              }`}>
                {message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                Verification Code
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  className="pl-10 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to your phone
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Phone Number"
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            {!canResend ? (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Resend code in {countdown}s</span>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>
                <Button
                  onClick={handleResendOTP}
                  variant="outline"
                  className="w-full"
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Wrong phone number?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Go back and change it
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
