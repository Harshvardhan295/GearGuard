import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockMaintenanceRequests, mockEquipment, mockUsers } from "@/data/mockData";
import { MaintenanceStatus } from "@/types";
import { format } from "date-fns";

const statusVariants: Record<MaintenanceStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  new: 'secondary',
  in_progress: 'default',
  repaired: 'outline',
  scrap: 'destructive',
};

const statusLabels: Record<MaintenanceStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  repaired: 'Repaired',
  scrap: 'Scrap',
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMaintenanceRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.subject}</TableCell>
                <TableCell>{getEquipmentName(request.equipmentId)}</TableCell>
                <TableCell>{getTechnicianName(request.technicianId)}</TableCell>
                <TableCell>{format(request.scheduledDate, 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[request.status]}>
                    {statusLabels[request.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
