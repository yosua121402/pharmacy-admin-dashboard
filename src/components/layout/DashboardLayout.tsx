
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Box, 
  Calendar, 
  CreditCard, 
  Home, 
  LogOut, 
  Menu, 
  Package, 
  Pill, 
  Settings, 
  Truck, 
  User, 
  Users, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Medicines',
    href: '/admin/medicines',
    icon: Pill,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: Box,
  },
  {
    title: 'Purchases',
    href: '/admin/purchases',
    icon: CreditCard,
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users,
  },
  {
    title: 'Distributors',
    href: '/admin/distributors',
    icon: Truck,
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: Activity,
  },
  {
    title: 'Calendar',
    href: '/admin/calendar',
    icon: Calendar,
  },
];

const secondaryNavItems: SidebarNavItem[] = [
  {
    title: 'Users',
    href: '/admin/users',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={cn(
          "fixed top-0 left-0 z-30 h-full w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col bg-white dark:bg-gray-900 shadow-lg">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <span className="h-8 w-8 rounded-md bg-pharma-500 flex items-center justify-center">
                <Pill className="h-5 w-5 text-white" />
              </span>
              <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Pharma Admin</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <Separator />

          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2">
                MAIN
              </div>
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-pharma-100 text-pharma-700 dark:bg-pharma-800/20 dark:text-pharma-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  
                  {item.title === 'Orders' && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-pharma-100 text-xs font-medium text-pharma-800 dark:bg-pharma-800/20 dark:text-pharma-400">
                      3
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 my-2 pt-4">
                ADMINISTRATION
              </div>
              {secondaryNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-pharma-100 text-pharma-700 dark:bg-pharma-800/20 dark:text-pharma-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          <div className="border-t p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 text-gray-700 dark:text-gray-300"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between border-b bg-white dark:bg-gray-900 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </Button>

            <Separator orientation="vertical" className="h-8" />

            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <span className="sr-only">User menu</span>
              <span className="flex h-full w-full items-center justify-center rounded-full bg-pharma-100 text-pharma-700">
                JD
              </span>
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
