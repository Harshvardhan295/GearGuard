import { AppLayout } from "@/components/layout/AppLayout";
import { InlineWidget } from "react-calendly";
import { Card, CardContent } from "@/components/ui/card";

export default function Calendar() {
  return (
    <AppLayout title="Maintenance Schedule">
      <div className="h-full flex flex-col space-y-4">
        <Card className="flex-1 overflow-hidden border-none shadow-sm">
          <CardContent className="p-0 h-[calc(100vh-180px)]">
            <InlineWidget 
              url="https://calendly.com/gearguard-maintenance" 
              styles={{ height: '100%', width: '100%' }}
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}