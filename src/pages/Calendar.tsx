//
import { AppLayout } from "@/components/layout/AppLayout";
import { InlineWidget } from "react-calendly";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockMaintenanceRequests } from "@/data/mockData";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function Calendar() {
  const preventiveTasks = mockMaintenanceRequests.filter(r => r.maintenanceType === 'preventive');

  return (
    <AppLayout title="Maintenance Schedule">
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="schedule">Internal Tasks</TabsTrigger>
          <TabsTrigger value="booking">Book Technician</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-6">
          <div className="grid gap-4">
            {preventiveTasks.map(task => (
              <div key={task.id} className="p-4 rounded-lg border bg-card flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-bold">{task.subject}</h4>
                  <p className="text-xs text-muted-foreground">{format(task.scheduledDate, 'MMMM do, yyyy @ HH:mm')}</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">Planned</Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="booking" className="h-[70vh]">
          <InlineWidget url="https://calendly.com/gearguard" styles={{ height: '100%' }} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}