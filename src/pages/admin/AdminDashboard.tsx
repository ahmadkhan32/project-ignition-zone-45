import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ScooterManager } from "@/components/admin/ScooterManager";
import { LogOut, Plus, Car } from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
}

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState("scooters");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_user');
    if (!storedAdmin) {
      navigate('/admin/login');
      return;
    }
    
    try {
      const admin = JSON.parse(storedAdmin);
      setAdminUser(admin);
    } catch (error) {
      console.error('Error parsing admin user:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/admin/login');
  };

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <span className="text-sm text-muted-foreground">
                Welcome, {adminUser.username}
              </span>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "scooters" ? "default" : "ghost"}
            onClick={() => setActiveTab("scooters")}
            className="flex items-center space-x-2"
          >
            <Car className="w-4 h-4" />
            <span>Scooter Management</span>
          </Button>
        </div>

        {/* Content */}
        {activeTab === "scooters" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="w-6 h-6 text-primary" />
                  <span>Scooter Management</span>
                </CardTitle>
                <CardDescription>
                  Manage your electric scooter inventory, add new models, and update existing ones.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScooterManager />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}