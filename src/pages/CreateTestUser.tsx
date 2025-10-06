import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function CreateTestUser() {
  const [formData, setFormData] = useState({
    email: "test@example.com",
    password: "Test123!@#",
    fullName: "Test User",
    phone: "+923470838718"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [userCreated, setUserCreated] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await signUp(formData.email, formData.password, formData.phone);
      
      if (error) {
        if (error.message.includes('User already registered')) {
          setMessage("User already exists! You can now login with these credentials.");
          setMessageType("success");
          setUserCreated(true);
        } else {
          setMessage(error.message || "Failed to create user");
          setMessageType("error");
        }
        return;
      }

      setMessage("Test user created successfully! You can now login with these credentials.");
      setMessageType("success");
      setUserCreated(true);
      toast.success("Test user created successfully!");
      
    } catch (error: any) {
      console.error("Create user error:", error);
      setMessage("An unexpected error occurred. Please try again.");
      setMessageType("error");
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  if (userCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Test User Ready!
            </CardTitle>
            <CardDescription className="text-gray-600">
              You can now login with the test credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-gray-900">Test Credentials:</h4>
              <div className="space-y-1 text-sm">
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Password:</strong> {formData.password}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/login')} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Go to Login
              </Button>
              <Button 
                onClick={() => navigate('/test-auth')} 
                variant="outline" 
                className="w-full"
              >
                Test Authentication
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Create Test User
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create a test user for authentication testing
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

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="test@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Test123!@#"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Test User"
                  required
                />
              </div>
            </div>

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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="+923470838718"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating User...
                </>
              ) : (
                "Create Test User"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              This will create a test user for authentication testing.
              <br />
              <strong>Note:</strong> You may need to verify the email before login.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
