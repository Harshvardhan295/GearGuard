import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMaintenanceRequests, mockUsers } from "@/data/mockData";
import { MaintenanceStatus } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, AlertCircle } from "lucide-react";
import { isPast, isToday } from "date-fns";
import { cn } from "@/lib/utils";

const columns: { key: MaintenanceStatus; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-500' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-amber-500' },
  { key: 'repaired', label: 'Repaired', color: 'bg-emerald-500' },
  { key: 'scrap', label: 'Scrap', color: 'bg-rose-500' },
];

export function MaintenanceKanban() {
  const getTechnician = (id: string) => mockUsers.find(u => u.id === id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
      {columns.map((col) => (
        <div key={col.key} className="bg-muted/30 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-border/50">
            <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", col.color)} />
              {col.label}
            </h3>
            <Badge variant="outline">{mockMaintenanceRequests.filter(r => r.status === col.key).length}</Badge>
          </div>
          
          <div className="space-y-3">
            {mockMaintenanceRequests.filter(r => r.status === col.key).map((req) => {
              const isOverdue = isPast(req.scheduledDate) && !isToday(req.scheduledDate) && req.status !== 'repaired';
              const tech = getTechnician(req.technicianId);

              return (
                <Card key={req.id} className="cursor-grab active:cursor-grabbing shadow-sm hover:ring-2 hover:ring-primary/20 transition-all">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-sm leading-tight">{req.subject}</p>
                      {isOverdue && (
                        <Badge variant="destructive" className="h-5 px-1.5 animate-pulse">
                          <AlertCircle className="h-3 w-3 mr-1" /> Overdue
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {req.duration}h
                      </div>
                      <Avatar className="h-6 w-6 border">
                        <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                          {tech?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}