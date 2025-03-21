
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CreditCard, 
  Calendar, 
  Truck, 
  PlusCircle, 
  Filter 
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

// Mock data for purchases (pembelian table)
const purchasesData = [
  {
    id: 1,
    invoice: 'PO-2023-0001',
    distributor: 'PharmaCorp Inc.',
    date: '2023-10-15',
    total: 4500000,
    status: 'completed',
    paymentMethod: 'transfer',
  },
  {
    id: 2,
    invoice: 'PO-2023-0002',
    distributor: 'MediSupply Co.',
    date: '2023-10-18',
    total: 2750000,
    status: 'processing',
    paymentMethod: 'credit',
  },
  {
    id: 3,
    invoice: 'PO-2023-0003',
    distributor: 'HealthDrug Distributors',
    date: '2023-10-20',
    total: 6200000,
    status: 'pending',
    paymentMethod: 'transfer',
  },
  {
    id: 4,
    invoice: 'PO-2023-0004',
    distributor: 'PharmaCorp Inc.',
    date: '2023-10-23',
    total: 1850000,
    status: 'completed',
    paymentMethod: 'cash',
  },
  {
    id: 5,
    invoice: 'PO-2023-0005',
    distributor: 'GlobalMed Supplies',
    date: '2023-10-25',
    total: 3200000,
    status: 'processing',
    paymentMethod: 'credit',
  },
];

// Table columns configuration
const columns = [
  {
    key: 'invoice',
    header: 'Invoice Number',
    cell: (row: any) => (
      <div className="font-medium">{row.invoice}</div>
    ),
    sortable: true,
  },
  {
    key: 'distributor',
    header: 'Distributor',
    sortable: true,
  },
  {
    key: 'date',
    header: 'Purchase Date',
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
      };
      
      return (
        <Badge 
          variant="outline" 
          className={statusStyles[row.status as keyof typeof statusStyles]}
        >
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
        cash: <ShoppingBag className="h-4 w-4 mr-2" />,
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

const Purchases = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter data based on status
  const filteredData = filterStatus === 'all' 
    ? purchasesData 
    : purchasesData.filter(item => item.status === filterStatus);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Purchases</h1>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Purchase
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Purchases
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 18,500,000</div>
              <p className="text-xs text-gray-500">For all time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Awaiting confirmation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Distributors
              </CardTitle>
              <Truck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">Active partnerships</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>
              Manage your purchase orders from distributors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/3">
                <Input placeholder="Search purchases..." />
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

export default Purchases;
