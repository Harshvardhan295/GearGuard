import { AppLayout } from "@/components/layout/AppLayout";
import { MaintenanceList } from "@/components/maintenance/MaintenanceList";

export default function Maintenance() {
  return (
    <AppLayout title="Maintenance Requests">
      <MaintenanceList />
    </AppLayout>
  );
}
