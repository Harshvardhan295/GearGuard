import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { mockMaintenanceRequests, mockEquipment, mockUsers } from "@/data/mockData";
import { MaintenanceStatus } from "@/types";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

const statusStyles: Record<MaintenanceStatus, string> = {
  new: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
  in_progress: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200',
  repaired: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200',
  scrap: 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200',
};

const statusLabels: Record<MaintenanceStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  repaired: 'Completed',
  scrap: 'Scrapped',
};

export function RecentActivity() {
  const getEquipmentName = (id?: string) => {
    if (!id) return '-';
    return mockEquipment.find(e => e.id === id)?.name || '-';
  };

  const getTechnicianName = (id: string) => {
    return mockUsers.find(u => u.id === id)?.name || '-';
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Recent Maintenance Requests</CardTitle>
          <CardDescription>Monitor the latest updates from the workshop</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1 shadow-xs">
          View All <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-card/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Subject</TableHead>
                <TableHead className="font-semibold">Equipment</TableHead>
                <TableHead className="font-semibold">Technician</TableHead>
                <TableHead className="font-semibold">Scheduled</TableHead>
                <TableHead className="font-semibold text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMaintenanceRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-accent/50 transition-colors">
                  <TableCell className="font-medium py-4">{request.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{getEquipmentName(request.equipmentId)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {getTechnicianName(request.technicianId).split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm">{getTechnicianName(request.technicianId)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(request.scheduledDate, 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={statusStyles[request.status]}>
                      {statusLabels[request.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}