import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintenance";
import MaintenanceNew from "./pages/MaintenanceNew";
import Equipment from "./pages/Equipment";
import EquipmentNew from "./pages/EquipmentNew";
import Categories from "./pages/Categories";
import WorkCenters from "./pages/WorkCenters";
import Teams from "./pages/Teams";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/maintenance/new" element={<MaintenanceNew />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/new" element={<EquipmentNew />} />
          <Route path="/equipment/categories" element={<Categories />} />
          <Route path="/settings/work-centers" element={<WorkCenters />} />
          <Route path="/settings/teams" element={<Teams />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
