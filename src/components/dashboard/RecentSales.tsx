
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface RecentSale {
  id: string;
  customer: {
    name: string;
    email: string;
    initials: string;
  };
  amount: string;
  status: 'completed' | 'processing' | 'pending';
  date: string;
}

const recentSales: RecentSale[] = [
  {
    id: '1',
    customer: {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      initials: 'OM',
    },
    amount: '$1,999.00',
    status: 'completed',
    date: '2 minutes ago',
  },
  {
    id: '2',
    customer: {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      initials: 'JL',
    },
    amount: '$39.00',
    status: 'processing',
    date: '1 hour ago',
  },
  {
    id: '3',
    customer: {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      initials: 'IN',
    },
    amount: '$299.00',
    status: 'completed',
    date: '3 hours ago',
  },
  {
    id: '4',
    customer: {
      name: 'William Kim',
      email: 'will@email.com',
      initials: 'WK',
    },
    amount: '$99.00',
    status: 'pending',
    date: '5 hours ago',
  },
  {
    id: '5',
    customer: {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      initials: 'SD',
    },
    amount: '$599.00',
    status: 'completed',
    date: '1 day ago',
  },
];

const getStatusColor = (status: RecentSale['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'processing':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export function RecentSales() {
  return (
    <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            You made 265 sales this month.
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-xs">
          Last 24 hours
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-pharma-100 text-pharma-700">
                    {sale.customer.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {sale.customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {sale.customer.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{sale.amount}</p>
                  <p className="text-xs text-muted-foreground">{sale.date}</p>
                </div>
                <div className={`h-2 w-2 rounded-full ${getStatusColor(sale.status)}`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentSales;
