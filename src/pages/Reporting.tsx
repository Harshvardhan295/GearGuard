import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function Reporting() {
  return (
    <AppLayout title="Reporting & Analytics">
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="p-4 rounded-full bg-primary/10">
          <BarChart3 className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground max-w-md">
            This module is currently being optimized to provide real-time insights into machine OEE and maintenance efficiency.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}