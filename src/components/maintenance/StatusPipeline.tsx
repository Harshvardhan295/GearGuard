import { cn } from "@/lib/utils";
import { MaintenanceStatus } from "@/types";
import { Check } from "lucide-react";

interface StatusPipelineProps {
  currentStatus: MaintenanceStatus;
  onStatusChange?: (status: MaintenanceStatus) => void;
}

const statuses: { key: MaintenanceStatus; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'repaired', label: 'Repaired' },
  { key: 'scrap', label: 'Scrap' },
];

export function StatusPipeline({ currentStatus, onStatusChange }: StatusPipelineProps) {
  const currentIndex = statuses.findIndex(s => s.key === currentStatus);

  return (
    <div className="flex items-center justify-between">
      {statuses.map((status, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        
        return (
          <div key={status.key} className="flex items-center">
            <button
              onClick={() => onStatusChange?.(status.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border transition-colors",
                isCompleted && "bg-primary text-primary-foreground border-primary",
                isCurrent && "bg-secondary text-secondary-foreground border-secondary",
                !isCompleted && !isCurrent && "bg-card text-muted-foreground border-border hover:bg-accent"
              )}
            >
              {isCompleted && <Check className="h-4 w-4" />}
              <span className="text-sm font-medium">{status.label}</span>
            </button>
            {index < statuses.length - 1 && (
              <div className={cn(
                "w-8 h-0.5",
                index < currentIndex ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
