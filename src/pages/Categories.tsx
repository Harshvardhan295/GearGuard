import { AppLayout } from "@/components/layout/AppLayout";
import { CategoryList } from "@/components/equipment/CategoryList";

export default function Categories() {
  return (
    <AppLayout title="Equipment Categories">
      <CategoryList />
    </AppLayout>
  );
}
