
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pill, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  className?: string;
  isAdminLogin?: boolean;
}

export function LoginForm({ className, isAdminLogin = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  // Get the return URL from the location state or default to home
  const from = (location.state as any)?.from?.pathname || (isAdminLogin ? '/admin' : '/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await login(email, password, isAdminLogin);
      
      if (success) {
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("mx-auto w-full max-w-sm", className)}>
      <Card className="backdrop-blur-md bg-white/90 dark:bg-gray-950/90 border-t border-white/20 shadow-xl animate-scale-in">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pharma-500">
            {isAdminLogin ? (
              <ShieldCheck className="h-6 w-6 text-white" />
            ) : (
              <Pill className="h-6 w-6 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            {isAdminLogin 
              ? "Enter your credentials to access the admin dashboard" 
              : "Enter your email and password to access your account"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-white/50 dark:bg-gray-800/50"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-pharma-600 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-white/50 dark:bg-gray-800/50"
                />
              </div>
              <Button 
                type="submit" 
                className={cn(
                  "w-full transition-all", 
                  isAdminLogin 
                    ? "bg-slate-800 hover:bg-slate-700" 
                    : "bg-pharma-600 hover:bg-pharma-500"
                )} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            <span>For demo, use:</span>
            <br />
            <span className="font-medium">{isAdminLogin ? "admin@example.com" : "user@example.com"} / password</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
