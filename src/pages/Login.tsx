
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pharma-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(49,130,255,0.1),transparent_60%)]"
        style={{ backgroundSize: '100% 100%', backgroundPosition: 'center center' }}
      />
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233182ff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
      
      <div className="container relative z-10 flex flex-col items-center justify-center gap-6 px-4 py-10 md:gap-10">
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pharmacy Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Access your pharmacy management system
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
