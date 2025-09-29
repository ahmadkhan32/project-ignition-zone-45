import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegistration from "./pages/admin/AdminRegistration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddScooterForm from "./pages/admin/AddScooterForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegistration />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-scooter" element={<AddScooterForm />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
