// src/pages/Dashboard.tsx
import { AppLayout } from "@/components/layout/AppLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { MaintenanceChart } from "@/components/dashboard/MaintenanceChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Reveal } from "@/components/ui/reveal"; // Import the new component
import { mockKPIData } from "@/data/mockData";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-8">
        {/* KPI Cards Section - Staggered Reveal */}
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal delay={100}>
            <KPICard
              title="Total Requests"
              value={mockKPIData.totalRequests}
              change={mockKPIData.totalRequestsChange}
              trend="up"
              variant="danger"
              icon={<ClipboardList className="h-8 w-8" />}
            />
          </Reveal>
          <Reveal delay={200}>
            <KPICard
              title="In Progress"
              value={mockKPIData.inProgress}
              change={mockKPIData.inProgressPercentage}
              trend="stable"
              variant="warning"
              icon={<Clock className="h-8 w-8" />}
            />
          </Reveal>
          <Reveal delay={300}>
            <KPICard
              title="Completed"
              value={mockKPIData.completed}
              trend={mockKPIData.completedTrend}
              variant="success"
              icon={<CheckCircle className="h-8 w-8" />}
            />
          </Reveal>
        </div>

        {/* Main Chart Section */}
        <Reveal delay={400}>
          <MaintenanceChart />
        </Reveal>

        {/* Activity Table Section */}
        <Reveal delay={500}>
          <RecentActivity />
        </Reveal>
      </div>
    </AppLayout>
  );
}