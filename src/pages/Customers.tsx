
import React, { useState } from 'react';
import { Users, User, Phone, Mail, ShoppingBag, PlusCircle, Filter } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DataTable from '@/components/ui/DataTable';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import StatsCard from '@/components/ui/StatsCard';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for customers (pelanggan table)
const customersData = [
  {
    id: 1,
    name: 'John Doe',
    phone: '081234567890',
    email: 'john.doe@example.com',
    address: 'Jl. Pahlawan No. 123, Jakarta',
    totalOrders: 8,
    totalSpent: 2450000,
    lastOrder: '2023-10-15',
    type: 'regular',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '082345678901',
    email: 'jane.smith@example.com',
    address: 'Jl. Merdeka No. 45, Bandung',
    totalOrders: 12,
    totalSpent: 3780000,
    lastOrder: '2023-10-18',
    type: 'vip',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    phone: '083456789012',
    email: 'ahmad.fauzi@example.com',
    address: 'Jl. Ahmad Yani No. 67, Surabaya',
    totalOrders: 3,
    totalSpent: 850000,
    lastOrder: '2023-10-10',
    type: 'new',
  },
  {
    id: 4,
    name: 'Maria Putri',
    phone: '084567890123',
    email: 'maria.putri@example.com',
    address: 'Jl. Sudirman No. 89, Makassar',
    totalOrders: 15,
    totalSpent: 4250000,
    lastOrder: '2023-10-20',
    type: 'vip',
  },
  {
    id: 5,
    name: 'Budi Santoso',
    phone: '085678901234',
    email: 'budi.santoso@example.com',
    address: 'Jl. Gatot Subroto No. 12, Yogyakarta',
    totalOrders: 6,
    totalSpent: 1650000,
    lastOrder: '2023-10-05',
    type: 'regular',
  },
];

// Table columns configuration
const columns = [
  {
    key: 'name',
    header: 'Customer Name',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <div className="font-medium">{row.name}</div>
      </div>
    ),
    sortable: true,
  },
  {
    key: 'phone',
    header: 'Phone',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-gray-500" />
        {row.phone}
      </div>
    ),
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-gray-500" />
        {row.email}
      </div>
    ),
    sortable: true,
  },
  {
    key: 'totalOrders',
    header: 'Orders',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-4 w-4 text-gray-500" />
        {row.totalOrders}
      </div>
    ),
    sortable: true,
  },
  {
    key: 'totalSpent',
    header: 'Total Spent',
    cell: (row: any) => (
      <div>Rp {row.totalSpent.toLocaleString('id-ID')}</div>
    ),
    sortable: true,
  },
  {
    key: 'type',
    header: 'Customer Type',
    cell: (row: any) => {
      const typeStyles = {
        vip: 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400',
        regular: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400',
        new: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
      };
      
      return (
        <Badge 
          variant="outline" 
          className={typeStyles[row.type as keyof typeof typeStyles]}
        >
          {row.type.toUpperCase()}
        </Badge>
      );
    },
    sortable: true,
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">View</Button>
        <Button variant="outline" size="sm">Edit</Button>
      </div>
    ),
  },
];

const Customers = () => {
  const [filterType, setFilterType] = useState<string>('all');

  // Filter data based on customer type
  const filteredData = filterType === 'all' 
    ? customersData 
    : customersData.filter(item => item.type === filterType);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <StatsCard
            title="Total Customers"
            value="125"
            description="Active customer accounts"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatsCard
            title="VIP Customers"
            value="28"
            description="High-value customers"
            icon={<User className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
            variant="translucent"
          />
          
          <StatsCard
            title="New Customers"
            value="15"
            description="Added this month"
            icon={<PlusCircle className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          
          <StatsCard
            title="Average Spend"
            value="Rp 2,850,000"
            description="Per customer"
            icon={<ShoppingBag className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
            variant="outline"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Database</CardTitle>
            <CardDescription>
              Manage your customer information and purchase history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/3">
                <Input placeholder="Search customers..." />
              </div>
              <div className="w-full sm:w-1/4">
                <Select 
                  defaultValue={filterType} 
                  onValueChange={setFilterType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="sm:ml-auto gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
            
            <DataTable 
              data={filteredData}
              columns={columns}
              pagination={true}
              onRowClick={(row) => console.log('Clicked row:', row)}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
