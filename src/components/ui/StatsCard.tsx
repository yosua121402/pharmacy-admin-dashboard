
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const statsCardVariants = cva(
  "rounded-lg border p-6 shadow-sm transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-950",
        translucent: "glass",
        outline: "bg-transparent",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  isLoading = false,
  variant,
  className,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div className={cn(statsCardVariants({ variant }), className)}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          {icon && <Skeleton className="h-8 w-8 rounded-full" />}
        </div>
        <Skeleton className="mt-2 h-8 w-16" />
        {description && <Skeleton className="mt-2 h-4 w-full" />}
        {trend && <Skeleton className="mt-2 h-4 w-20" />}
      </div>
    );
  }

  return (
    <div className={cn(statsCardVariants({ variant }), className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
      {trend && (
        <div className={cn(
          "mt-2 flex items-center text-xs font-medium",
          trend.isPositive ? "text-green-600" : "text-red-600"
        )}>
          <span className="flex items-center gap-1">
            {trend.isPositive ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
          </span>
          <span className="ml-1 text-muted-foreground">vs. last month</span>
        </div>
      )}
    </div>
  );
}

export default StatsCard;
