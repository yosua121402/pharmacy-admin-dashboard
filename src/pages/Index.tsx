
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentSales } from '@/components/dashboard/RecentSales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { name: 'Jan', total: 2400 },
  { name: 'Feb', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Apr', total: 3908 },
  { name: 'May', total: 4800 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4300 },
];

const topProducts = [
  { name: 'Paracetamol', value: 540 },
  { name: 'Amoxicillin', value: 620 },
  { name: 'Ibuprofen', value: 210 },
  { name: 'Aspirin', value: 320 },
  { name: 'Cetirizine', value: 180 },
];

const COLORS = ['#3182ff', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

const Index = () => {
  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Dashboard" 
        subtitle={getCurrentDate()} 
        className="mb-6"
      />
      
      <DashboardStats />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="md:col-span-4 animate-scale-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`} 
                    tickLine={false} 
                    axisLine={false} 
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      border: 'none',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3182ff"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <RecentSales />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Most sold products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} units`, 'Sales']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      border: 'none',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 animate-scale-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', event: 'New order #58923 received from Olivia Martin' },
                { time: '1 hour ago', event: 'Stock updated for Amoxicillin (+200 units)' },
                { time: '3 hours ago', event: 'Payment received for order #58912' },
                { time: '5 hours ago', event: 'New distributor "MediSupply Inc." added to the system' },
                { time: '1 day ago', event: 'Stock alert: Paracetamol is running low (15 units remaining)' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-2 w-2 mt-2 rounded-full bg-pharma-500" />
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {activity.time}
                    </p>
                    <p className="text-sm font-medium">
                      {activity.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
