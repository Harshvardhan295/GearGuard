//
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockMaintenanceRequests } from "@/data/mockData";

export function EquipmentForm({ equipmentId, onCancel }: any) {
  const requestCount = mockMaintenanceRequests.filter(r => r.equipmentId === equipmentId && r.status !== 'repaired').length;

  return (
    <div className="space-y-6">
      {/* Smart Buttons Section */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="h-14 px-6 gap-3 border-dashed">
          <Wrench className="h-5 w-5 text-primary" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground font-semibold">Maintenance</div>
            <div className="font-bold flex items-center gap-2">
              All Requests <Badge className="bg-primary text-[10px] h-4">{requestCount}</Badge>
            </div>
          </div>
        </Button>
        <Button variant="outline" className="h-14 px-6 gap-3 border-dashed">
          <History className="h-5 w-5 text-muted-foreground" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground font-semibold">Work Logs</div>
            <div className="font-bold">History</div>
          </div>
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Asset Information</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Serial Number</Label>
            <Input placeholder="SN-2025-XXXX" />
          </div>
          <div className="space-y-2">
            <Label>Warranty Information</Label>
            <Input placeholder="e.g. 3 Years Global" />
          </div>
          <div className="space-y-2">
            <Label>Purchase Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label>Physical Location</Label>
            <Input placeholder="Building B, Floor 2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}