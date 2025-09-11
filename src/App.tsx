import React, { lazy, Suspense } from "react"; // --- 1. IMPORT LAZY & SUSPENSE
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// --- 2. CHANGE PAGES TO BE LAZY-LOADED ---
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminOTP = lazy(() => import("./pages/AdminOTP"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AdminResetPassword = lazy(() => import("./pages/AdminResetPassword"));
const AdminProjects = lazy(() => import("./pages/AdminProjects"));
const AdminCertifications = lazy(() => import("./pages/AdminCertifications"));

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ffeb3b" },
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* --- 3. WRAP ROUTES IN SUSPENSE --- */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/otp" element={<AdminOTP />} />
              <Route path="/admin/reset" element={<AdminResetPassword />} />

              {/* --- Admin Routes --- */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/certifications" element={<AdminCertifications />} />

              {/* --- Fallback Route --- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;