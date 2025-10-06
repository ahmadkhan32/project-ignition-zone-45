import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function TestOTP() {
  const [phone, setPhone] = useState("+923470838718");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const { sendOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setLoading(true);
    setMessage("");

    if (!phone) {
      setMessage("Please enter a phone number");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const { error } = await sendOTP(phone);
      
      if (error) {
        throw error;
      }

      setMessage("OTP sent successfully! Check your phone or console for the code.");
      setMessageType("success");
      setOtpSent(true);
      toast.success("OTP sent successfully!");
      
      // For development, generate a random OTP
      const devOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(devOtp);
      console.log(`🔐 Development OTP for ${phone}: ${devOtp}`);
      
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setMessage(error.message || "Failed to send OTP");
      setMessageType("error");
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
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

      setMessage("OTP verified successfully!");
      setMessageType("success");
      toast.success("OTP verified successfully!");
      
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      setMessage(error.message || "Invalid OTP");
      setMessageType("error");
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/test-auth")}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Test OTP System
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Test SMS OTP sending and verification
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

          {generatedOtp && (
            <Alert className="border-blue-200 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Development Mode:</strong> Use OTP: <code className="bg-blue-100 px-1 rounded">{generatedOtp}</code>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <Button
              onClick={handleSendOTP}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>

          {otpSent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                  Enter OTP Code
                </Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  className="text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> In development mode, OTP will be logged to console.
              <br />
              For production, configure Twilio credentials.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
