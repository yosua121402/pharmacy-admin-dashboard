
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pill, Home, Package, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-950">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-pharma-500 flex items-center justify-center">
              <Pill className="h-5 w-5 text-white" />
            </span>
            <span className="text-xl font-bold">PharmaCare</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-pharma-700", 
                isActive ? "text-pharma-700" : "text-muted-foreground")
              }
            >
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-pharma-700", 
                isActive ? "text-pharma-700" : "text-muted-foreground")
              }
            >
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </div>
            </NavLink>
            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-pharma-700", 
                isActive ? "text-pharma-700" : "text-muted-foreground")
              }
            >
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
              </div>
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-pharma-700", 
                isActive ? "text-pharma-700" : "text-muted-foreground")
              }
            >
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </div>
            </NavLink>
          </nav>
          
          <div className="flex items-center gap-2">
            <NavLink to="/admin/login">
              <Button variant="outline" size="sm">Admin</Button>
            </NavLink>
            <NavLink to="/login">
              <Button size="sm">Login</Button>
            </NavLink>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>
      
      <footer className="border-t bg-slate-50 dark:bg-gray-900">
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PharmaCare</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted pharmacy for all medical needs
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><NavLink to="/" className="text-sm text-muted-foreground hover:text-pharma-700">Home</NavLink></li>
                <li><NavLink to="/products" className="text-sm text-muted-foreground hover:text-pharma-700">Products</NavLink></li>
                <li><NavLink to="/cart" className="text-sm text-muted-foreground hover:text-pharma-700">Cart</NavLink></li>
                <li><NavLink to="/contact" className="text-sm text-muted-foreground hover:text-pharma-700">Contact</NavLink></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-sm text-muted-foreground">
                <p>123 Pharmacy Street</p>
                <p>Medicine City, MC 12345</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@pharmacare.com</p>
              </address>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <p className="text-sm text-muted-foreground">
                Monday - Friday: 9am - 9pm<br />
                Saturday: 9am - 7pm<br />
                Sunday: 10am - 6pm
              </p>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PharmaCare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
