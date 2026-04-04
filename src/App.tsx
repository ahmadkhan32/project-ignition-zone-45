import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ScootersPage from "./pages/ScootersPage";
import ScooterDetail from "./pages/ScooterDetail";
import TechnologyPage from "./pages/TechnologyPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PreOrderPage from "./pages/PreOrderPage";
import TestRidePage from "./pages/TestRidePage";
import ContactSalesPage from "./pages/ContactSalesPage";
import SpecSheetPage from "./pages/SpecSheetPage";
import ShowroomPage from "./pages/ShowroomPage";
import LiveChatPage from "./pages/LiveChatPage";
import CallNowPage from "./pages/CallNowPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import AuthCallback from "./pages/auth/AuthCallback";
import TestAuth from "./pages/TestAuth";
import TestOTP from "./pages/TestOTP";
import CreateTestUser from "./pages/CreateTestUser";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegistration from "./pages/admin/AdminRegistration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddScooterForm from "./pages/admin/AddScooterForm";
import WarrantyStartPage from "./pages/admin/WarrantyStartPage";
import SellVehiclePage from "./pages/admin/SellVehiclePage";
import VehiclesSoldPage from "./pages/admin/VehiclesSoldPage";
import WarrantyCheckPage from "./pages/WarrantyCheckPage";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Default Route - Index Page First */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/scooters" element={<ScootersPage />} />
            <Route path="/scooter/:id" element={<ScooterDetail />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pre-order" element={<PreOrderPage />} />
            <Route path="/test-ride" element={<TestRidePage />} />
            <Route path="/contact-sales" element={<ContactSalesPage />} />
            <Route path="/spec-sheet" element={<SpecSheetPage />} />
            <Route path="/showroom" element={<ShowroomPage />} />
            <Route path="/live-chat" element={<LiveChatPage />} />
            <Route path="/call-now" element={<CallNowPage />} />
            <Route path="/registerss" element={<Register />} />
            <Route path="/warranty-check" element={<WarrantyCheckPage />} />
            {/* Admin Routes - Only for admins */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegistration />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-scooter" element={<AddScooterForm />} />
            <Route path="/admin/sell-vehicle" element={<SellVehiclePage />} />
            <Route path="/admin/vehicles-sold" element={<VehiclesSoldPage />} />
            <Route path="/warranty-start" element={<WarrantyStartPage />} />

            {/* Test Routes - Development only */}
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="/test-otp" element={<TestOTP />} />
            <Route path="/create-test-user" element={<CreateTestUser />} />

            {/* Legacy Auth Routes - Redirect to admin login */}
            <Route path="/login" element={<Navigate to="/admin-login" replace />} />
            <Route path="/register" element={<Navigate to="/admin-login" replace />} />
            <Route path="/forgot-password" element={<Navigate to="/admin-login" replace />} />
            <Route path="/verify-otp" element={<Navigate to="/admin-login" replace />} />
            <Route path="/auth/callback" element={<Navigate to="/admin-login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/admin-dashboard" replace />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
