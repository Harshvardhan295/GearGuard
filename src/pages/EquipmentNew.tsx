import { AppLayout } from "@/components/layout/AppLayout";
import { EquipmentForm } from "@/components/equipment/EquipmentForm";
import { useNavigate } from "react-router-dom";

export default function EquipmentNew() {
  const navigate = useNavigate();
  return (
    <AppLayout title="New Equipment">
      <EquipmentForm onCancel={() => navigate('/equipment')} onSubmit={() => navigate('/equipment')} />
    </AppLayout>
  );
}
