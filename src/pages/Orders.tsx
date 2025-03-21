
import React, { useState } from 'react';
import { 
  Box, 
  CreditCard, 
  Calendar, 
  User,
  PlusCircle, 
  Filter,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

// Mock data for orders
const ordersData = [
  {
    id: 1,
    orderNumber: 'ORD-2023-0001',
    customer: 'John Doe',
    date: '2023-10-15',
    items: 3,
    total: 450000,
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: 2,
    orderNumber: 'ORD-2023-0002',
    customer: 'Jane Smith',
    date: '2023-10-18',
    items: 2,
    total: 275000,
    status: 'processing',
    paymentMethod: 'transfer',
  },
  {
    id: 3,
    orderNumber: 'ORD-2023-0003',
    customer: 'Robert Johnson',
    date: '2023-10-20',
    items: 5,
    total: 620000,
    status: 'pending',
    paymentMethod: 'credit',
  },
  {
    id: 4,
    orderNumber: 'ORD-2023-0004',
    customer: 'Maria Garcia',
    date: '2023-10-23',
    items: 1,
    total: 185000,
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: 5,
    orderNumber: 'ORD-2023-0005',
    customer: 'David Kim',
    date: '2023-10-25',
    items: 4,
    total: 320000,
    status: 'cancelled',
    paymentMethod: 'transfer',
  },
  {
    id: 6,
    orderNumber: 'ORD-2023-0006',
    customer: 'Sarah Chen',
    date: '2023-10-27',
    items: 2,
    total: 198000,
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: 7,
    orderNumber: 'ORD-2023-0007',
    customer: 'Michael Brown',
    date: '2023-10-29',
    items: 3,
    total: 345000,
    status: 'processing',
    paymentMethod: 'credit',
  },
];

// Table columns configuration
const columns = [
  {
    key: 'orderNumber',
    header: 'Order #',
    cell: (row: any) => (
      <div className="font-medium">{row.orderNumber}</div>
    ),
    sortable: true,
  },
  {
    key: 'customer',
    header: 'Customer',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span>{row.customer}</span>
      </div>
    ),
    sortable: true,
  },
  {
    key: 'date',
    header: 'Order Date',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{row.date}</span>
      </div>
    ),
    sortable: true,
  },
  {
    key: 'items',
    header: 'Items',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <Box className="h-4 w-4 text-muted-foreground" />
        <span>{row.items}</span>
      </div>
    ),
    sortable: true,
  },
  {
    key: 'total',
    header: 'Total Amount',
    cell: (row: any) => (
      <div>Rp {row.total.toLocaleString('id-ID')}</div>
    ),
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row: any) => {
      const statusStyles = {
        completed: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
        processing: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400',
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400',
      };
      
      const statusIcons = {
        completed: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        processing: <Clock className="h-3.5 w-3.5 mr-1" />,
        pending: <Clock className="h-3.5 w-3.5 mr-1" />,
        cancelled: <XCircle className="h-3.5 w-3.5 mr-1" />,
      };
      
      return (
        <Badge 
          variant="outline" 
          className={`flex items-center ${statusStyles[row.status as keyof typeof statusStyles]}`}
        >
          {statusIcons[row.status as keyof typeof statusIcons]}
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      );
    },
    sortable: true,
  },
  {
    key: 'paymentMethod',
    header: 'Payment Method',
    cell: (row: any) => {
      const paymentIcons = {
        transfer: <CreditCard className="h-4 w-4 mr-2" />,
        credit: <CreditCard className="h-4 w-4 mr-2" />,
        cash: <CreditCard className="h-4 w-4 mr-2" />,
      };
      
      return (
        <div className="flex items-center">
          {paymentIcons[row.paymentMethod as keyof typeof paymentIcons]}
          <span>{row.paymentMethod.charAt(0).toUpperCase() + row.paymentMethod.slice(1)}</span>
        </div>
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

const Orders = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter data based on status
  const filteredData = filterStatus === 'all' 
    ? ordersData 
    : ordersData.filter(item => item.status === filterStatus);

  // Calculate summary statistics
  const totalOrders = ordersData.length;
  const completedOrders = ordersData.filter(order => order.status === 'completed').length;
  const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Order
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <Box className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-gray-500">All orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Completed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders}</div>
              <p className="text-xs text-gray-500">Fulfilled orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-gray-500">Awaiting fulfillment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</div>
              <p className="text-xs text-gray-500">From all orders</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>
              View and manage customer orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/3">
                <Input placeholder="Search orders..." />
              </div>
              <div className="w-full sm:w-1/4">
                <Select 
                  defaultValue={filterStatus} 
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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

export default Orders;
