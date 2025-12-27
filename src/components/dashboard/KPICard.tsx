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
  default: 'bg-card border-border',
  danger: 'bg-destructive/10 border-destructive/20',
  warning: 'bg-chart-1/10 border-chart-1/20',
  success: 'bg-chart-5/10 border-chart-5/20',
};

const trendColors = {
  up: 'text-chart-5',
  down: 'text-destructive',
  stable: 'text-muted-foreground',
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
    <Card className={cn("border", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm", trendColors[trend])}>
                <TrendIcon className="h-4 w-4" />
                <span>{change > 0 ? '+' : ''}{change}%</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
