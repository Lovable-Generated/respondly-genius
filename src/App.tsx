import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { EnhancedUserDashboard } from "./components/EnhancedUserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { EmailInbox } from "./components/pages/EmailInbox";
import { Analytics } from "./components/pages/Analytics";
import { Subscription } from "./components/pages/Subscription";
import { AISettings } from "./components/pages/AISettings";
import { EmailTemplates } from "./components/pages/EmailTemplates";
import { TeamManagement } from "./components/pages/TeamManagement";
import { Integrations } from "./components/pages/Integrations";
import { SentResponses } from "./components/pages/SentResponses";
import { ResponseHistory } from "./components/pages/ResponseHistory";
import { AutoReplyRules } from "./components/pages/AutoReplyRules";
import { APIKeys } from "./components/pages/APIKeys";
import { LanguageSettings } from "./components/pages/LanguageSettings";
import { ResponseAnalytics } from "./components/pages/ResponseAnalytics";
import { UsageReports } from "./components/pages/UsageReports";
import { RevenueImpact } from "./components/pages/RevenueImpact";
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<EnhancedUserDashboard />} />
          
          {/* Email Management */}
          <Route path="/emails/inbox" element={<EmailInbox />} />
          <Route path="/emails/sent" element={<SentResponses />} />
          <Route path="/emails/history" element={<ResponseHistory />} />
          
          {/* AI & Automation */}
          <Route path="/ai/settings" element={<AISettings />} />
          <Route path="/ai/rules" element={<AutoReplyRules />} />
          <Route path="/templates" element={<EmailTemplates />} />
          <Route path="/languages" element={<LanguageSettings />} />
          
          {/* Analytics */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/analytics/responses" element={<ResponseAnalytics />} />
          <Route path="/analytics/usage" element={<UsageReports />} />
          <Route path="/analytics/revenue" element={<RevenueImpact />} />
          
          {/* Account */}
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/api-keys" element={<APIKeys />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
