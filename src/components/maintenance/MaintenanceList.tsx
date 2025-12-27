import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockMaintenanceRequests, mockEquipment, mockUsers } from "@/data/mockData";
import { MaintenanceStatus } from "@/types";
import { format } from "date-fns";
import { Plus, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

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

export function MaintenanceList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getEquipmentName = (id?: string) => {
    if (!id) return '-';
    return mockEquipment.find(e => e.id === id)?.name || '-';
  };

  const getTechnicianName = (id: string) => {
    return mockUsers.find(u => u.id === id)?.name || '-';
  };

  const filteredRequests = mockMaintenanceRequests.filter(request => {
    const matchesSearch = request.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Maintenance Requests</CardTitle>
          <Button asChild>
            <Link to="/maintenance/new">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search requests..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="repaired">Repaired</SelectItem>
              <SelectItem value="scrap">Scrap</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{request.subject}</TableCell>
                <TableCell className="capitalize">{request.maintenanceType}</TableCell>
                <TableCell>{getEquipmentName(request.equipmentId)}</TableCell>
                <TableCell>{getTechnicianName(request.technicianId)}</TableCell>
                <TableCell>{format(request.scheduledDate, 'MMM d, yyyy HH:mm')}</TableCell>
                <TableCell>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <Star 
                        key={star}
                        className={`h-4 w-4 ${star <= request.priority ? 'fill-chart-1 text-chart-1' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                </TableCell>
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
