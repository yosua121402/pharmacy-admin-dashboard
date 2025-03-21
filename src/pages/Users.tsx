
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Search, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for users
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-06-10T09:30:00',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Pharmacist',
    status: 'Active',
    lastLogin: '2023-06-09T14:45:00',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Cashier',
    status: 'Inactive',
    lastLogin: '2023-05-28T11:20:00',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Owner',
    status: 'Active',
    lastLogin: '2023-06-10T08:15:00',
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'Pharmacist',
    status: 'Active',
    lastLogin: '2023-06-08T16:30:00',
  },
];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'Admin':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-800/20 dark:text-purple-400';
    case 'Pharmacist':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-800/20 dark:text-blue-400';
    case 'Cashier':
      return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400';
    case 'Owner':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-800/20 dark:text-amber-400';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/20 dark:text-gray-400';
  }
};

const getStatusBadgeColor = (status: string) => {
  return status === 'Active' 
    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-800/20 dark:text-emerald-400'
    : 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const Users = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage your users and their access levels
            </p>
          </div>
          <Button className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Users List</CardTitle>
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full"
                />
              </div>
            </div>
            <CardDescription>
              Showing {users.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)} variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)} variant="outline">{user.status}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Users;
