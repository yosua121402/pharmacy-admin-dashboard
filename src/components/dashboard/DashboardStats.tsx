
import React from 'react';
import { Activity, CreditCard, Package, Users } from 'lucide-react';
import { StatsCard } from '@/components/ui/StatsCard';

export function DashboardStats() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Sales"
        value="$24,560.00"
        description="Total sales this month"
        icon={<CreditCard className="h-4 w-4" />}
        trend={{ value: 12.5, isPositive: true }}
        className="animate-slide-in-bottom" 
        style={{ animationDelay: '0ms' }}
      />
      <StatsCard
        title="Total Orders"
        value="345"
        description="Total orders this month"
        icon={<Package className="h-4 w-4" />}
        trend={{ value: 8.2, isPositive: true }}
        className="animate-slide-in-bottom" 
        style={{ animationDelay: '100ms' }}
      />
      <StatsCard
        title="Active Customers"
        value="2,450"
        description="Customers with orders"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 5.3, isPositive: true }}
        className="animate-slide-in-bottom" 
        style={{ animationDelay: '200ms' }}
      />
      <StatsCard
        title="Low Stock Items"
        value="18"
        description="Items below threshold"
        icon={<Activity className="h-4 w-4" />}
        trend={{ value: 2.1, isPositive: false }}
        className="animate-slide-in-bottom" 
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}

export default DashboardStats;
