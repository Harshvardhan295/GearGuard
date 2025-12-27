import { AppLayout } from "@/components/layout/AppLayout";
import { TeamList } from "@/components/settings/TeamList";

export default function Teams() {
  return (
    <AppLayout title="Teams">
      <TeamList />
    </AppLayout>
  );
}
