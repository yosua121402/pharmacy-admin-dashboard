
import React, { useState } from 'react';
import { Truck, User, Phone, Mail, MapPin, PlusCircle, Filter } from 'lucide-react';
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

// Mock data for distributors (distributor table)
const distributorsData = [
  {
    id: 1,
    name: 'PharmaCorp Inc.',
    contactName: 'David Johnson',
    phone: '021-5557890',
    email: 'contact@pharmacorp.com',
    address: 'Jl. Industri Farmasi No. 45, Jakarta Utara',
    status: 'active',
    totalPurchases: 15,
    lastPurchase: '2023-10-15',
  },
  {
    id: 2,
    name: 'MediSupply Co.',
    contactName: 'Sarah Williams',
    phone: '021-5558901',
    email: 'info@medisupply.co.id',
    address: 'Jl. Gatot Subroto Km. 5, Jakarta Selatan',
    status: 'active',
    totalPurchases: 8,
    lastPurchase: '2023-10-18',
  },
  {
    id: 3,
    name: 'HealthDrug Distributors',
    contactName: 'Michael Chen',
    phone: '022-4446789',
    email: 'orders@healthdrug.com',
    address: 'Jl. Pasteur No. 123, Bandung',
    status: 'inactive',
    totalPurchases: 5,
    lastPurchase: '2023-09-30',
  },
  {
    id: 4,
    name: 'GlobalMed Supplies',
    contactName: 'Linda Kusuma',
    phone: '031-8889012',
    email: 'sales@globalmed.co.id',
    address: 'Jl. Raya Darmo No. 56, Surabaya',
    status: 'active',
    totalPurchases: 12,
    lastPurchase: '2023-10-10',
  },
  {
    id: 5,
    name: 'PharmaPlus Distribution',
    contactName: 'Robert Tanaka',
    phone: '024-7778901',
    email: 'contact@pharmaplus.com',
    address: 'Jl. Pandanaran No. 78, Semarang',
    status: 'pending',
    totalPurchases: 0,
    lastPurchase: '-',
  },
];

// Table columns configuration
const columns = [
  {
    key: 'name',
    header: 'Distributor Name',
    cell: (row: any) => (
      <div className="font-medium">{row.name}</div>
    ),
    sortable: true,
  },
  {
    key: 'contactName',
    header: 'Contact Person',
    cell: (row: any) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-gray-500" />
        {row.contactName}
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
    key: 'totalPurchases',
    header: 'Orders',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row: any) => {
      const statusStyles = {
        active: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
        inactive: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400',
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

const Distributors = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter data based on status
  const filteredData = filterStatus === 'all' 
    ? distributorsData 
    : distributorsData.filter(item => item.status === filterStatus);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Distributors</h1>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Distributor
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Active Distributors"
            value="12"
            description="Currently partnered suppliers"
            icon={<Truck className="h-4 w-4" />}
            trend={{ value: 2, isPositive: true }}
          />
          
          <StatsCard
            title="Purchase Orders"
            value="56"
            description="Total orders made to distributors"
            icon={<MapPin className="h-4 w-4" />}
            trend={{ value: 10, isPositive: true }}
            variant="translucent"
          />
          
          <StatsCard
            title="Pending Approvals"
            value="3"
            description="New distributors awaiting approval"
            icon={<User className="h-4 w-4" />}
            trend={{ value: 1, isPositive: true }}
            variant="outline"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Distributor Management</CardTitle>
            <CardDescription>
              Manage your medicine suppliers and distributors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/3">
                <Input placeholder="Search distributors..." />
              </div>
              <div className="w-full sm:w-1/4">
                <select 
                  className="w-full h-10 px-3 py-2 bg-background text-sm rounded-md border border-input"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
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

export default Distributors;
