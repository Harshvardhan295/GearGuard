import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  variant?: 'default' | 'danger' | 'warning' | 'success';
  icon?: React.ReactNode;
}

const variantStyles = {
  default: 'bg-card border-border hover:shadow-md',
  danger: 'bg-destructive/5 border-destructive/20 text-destructive hover:shadow-destructive/10',
  warning: 'bg-amber-500/5 border-amber-500/20 text-amber-600 hover:shadow-amber-500/10',
  success: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 hover:shadow-emerald-500/10',
};

export function KPICard({ 
  title, 
  value, 
  change, 
  trend = 'stable', 
  variant = 'default',
  icon 
}: KPICardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <Card className={cn(
      "transition-all duration-300 transform hover:-translate-y-1",
      variantStyles[variant]
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{value}</h2>
              {change !== undefined && (
                <div className={cn(
                  "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full bg-background/50 border",
                  trend === 'up' ? "text-emerald-600 border-emerald-200" : trend === 'down' ? "text-destructive border-destructive/20" : "text-muted-foreground border-border"
                )}>
                  <TrendIcon className="h-3 w-3" />
                  <span>{change > 0 ? '+' : ''}{change}%</span>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            variant === 'default' ? "bg-muted/10 text-muted-foreground" : "bg-current/10"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}