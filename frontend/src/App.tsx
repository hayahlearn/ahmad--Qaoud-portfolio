import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Suspense, lazy } from "react";
import { PageLoading } from "@/components/PageLoading";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/about"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/contact"));
const CaseStudies = lazy(() => import("./pages/case-studies"));
const Investors = lazy(() => import("./pages/Investors"));
const BookConsultation = lazy(() => import("./pages/book-consultation"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminStats = lazy(() => import("./pages/AdminStats"));
const Tools = lazy(() => import("./pages/tools"));
const Resources = lazy(() => import("./pages/resources"));
const SpecialEducation = lazy(() => import("./pages/special-education"));
const SovereignDashboard = lazy(() => import("./pages/SovereignDashboard"));
const UploadPortal = lazy(() => import("./pages/UploadPortal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransitionWrapper><Index /></PageTransitionWrapper>} />
        <Route path="/about" element={<PageTransitionWrapper><About /></PageTransitionWrapper>} />
        <Route path="/services" element={<PageTransitionWrapper><Services /></PageTransitionWrapper>} />
        <Route path="/projects" element={<PageTransitionWrapper><Projects /></PageTransitionWrapper>} />
        <Route path="/projects/:slug" element={<PageTransitionWrapper><ProjectDetail /></PageTransitionWrapper>} />
        <Route path="/blog" element={<PageTransitionWrapper><Blog /></PageTransitionWrapper>} />
        <Route path="/blog/:slug" element={<PageTransitionWrapper><BlogPost /></PageTransitionWrapper>} />
        <Route path="/contact" element={<PageTransitionWrapper><Contact /></PageTransitionWrapper>} />
        <Route path="/case-studies" element={<PageTransitionWrapper><CaseStudies /></PageTransitionWrapper>} />
        <Route path="/investors" element={<PageTransitionWrapper><Investors /></PageTransitionWrapper>} />
        <Route path="/roi-calculator" element={<PageTransitionWrapper><Tools /></PageTransitionWrapper>} />
        <Route path="/book" element={<PageTransitionWrapper><BookConsultation /></PageTransitionWrapper>} />
        <Route path="/admin/auth" element={<PageTransitionWrapper><AdminAuth /></PageTransitionWrapper>} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<PageTransitionWrapper><AdminDashboard /></PageTransitionWrapper>} />
          <Route path="/admin/stats" element={<PageTransitionWrapper><AdminStats /></PageTransitionWrapper>} />
        </Route>

        <Route path="/sovereign" element={<PageTransitionWrapper><SovereignDashboard /></PageTransitionWrapper>} />
        <Route path="/gatekeeper" element={<PageTransitionWrapper><UploadPortal /></PageTransitionWrapper>} />
        <Route path="/tools" element={<PageTransitionWrapper><Tools /></PageTransitionWrapper>} />
        <Route path="/resources" element={<PageTransitionWrapper><Resources /></PageTransitionWrapper>} />
        <Route path="/special-education" element={<PageTransitionWrapper><SpecialEducation /></PageTransitionWrapper>} />
        <Route path="*" element={<PageTransitionWrapper><NotFound /></PageTransitionWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoading />}>
                <AppRoutes />
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
