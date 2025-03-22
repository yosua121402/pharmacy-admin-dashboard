
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Progress } from './progress';
import { Pill } from 'lucide-react';

interface LoadingScreenProps {
  progress?: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(49,130,255,0.1),transparent_60%)]"
        style={{ backgroundSize: '100% 100%', backgroundPosition: 'center center' }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pharma-100 dark:bg-gray-800">
            <Pill className="h-8 w-8 text-pharma-600 dark:text-pharma-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-pharma-800 dark:text-pharma-100">PharmaCare</h1>
          <p className="text-muted-foreground">Loading your healthcare experience</p>
        </div>
        
        <div className="w-64">
          {progress !== undefined ? (
            <>
              <Progress value={progress} className="h-2 w-full" />
              <p className="mt-2 text-center text-sm text-muted-foreground">{Math.round(progress)}%</p>
            </>
          ) : (
            <LoadingSpinner size="lg" />
          )}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PharmaCare. All rights reserved.
      </div>
    </div>
  );
}
