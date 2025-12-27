import { AppLayout } from "@/components/layout/AppLayout";
import { WorkCenterList } from "@/components/settings/WorkCenterList";

export default function WorkCenters() {
  return (
    <AppLayout title="Work Centers">
      <WorkCenterList />
    </AppLayout>
  );
}
