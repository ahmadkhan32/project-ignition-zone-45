import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Zap, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Building, 
  LogOut,
  Home,
  Database
} from 'lucide-react';
import AdminScooters from '@/components/admin/AdminScooters';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminFAQs from '@/components/admin/AdminFAQs';
import AdminTechnology from '@/components/admin/AdminTechnology';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminSiteContent from '@/components/admin/AdminSiteContent';
import AdminSEO from '@/components/admin/AdminSEO';
import AdminNavigation from '@/components/admin/AdminNavigation';

const AdminDashboard = () => {
  const { isAdminLoggedIn, logout, loading } = useAdmin();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">EvolutionEV Content Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/', '_blank')}
                className="hidden sm:flex"
              >
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="scooters" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Scooters</span>
            </TabsTrigger>
            <TabsTrigger value="technology" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Tech</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">FAQs</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <AdminSiteContent />
          </TabsContent>

          <TabsContent value="scooters" className="space-y-6">
            <AdminScooters />
          </TabsContent>

          <TabsContent value="technology" className="space-y-6">
            <AdminTechnology />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <AdminTestimonials />
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <AdminFAQs />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <AdminNavigation />
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <AdminSEO />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;