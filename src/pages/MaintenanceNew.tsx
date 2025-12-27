import { AppLayout } from "@/components/layout/AppLayout";
import { MaintenanceForm } from "@/components/maintenance/MaintenanceForm";
import { useNavigate } from "react-router-dom";

export default function MaintenanceNew() {
  const navigate = useNavigate();
  return (
    <AppLayout title="New Maintenance Request">
      <MaintenanceForm onCancel={() => navigate('/maintenance')} onSubmit={() => navigate('/maintenance')} />
    </AppLayout>
  );
}
