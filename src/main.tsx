
import { createRoot } from 'react-dom/client'
import React, { Suspense, lazy, useState, useEffect } from 'react';
import './index.css'
import { LoadingScreen } from './components/ui/LoadingScreen';

// Lazy load the App component
const App = lazy(() => import('./App.tsx'));

// Create root element
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Loading component with progress
function AppLoader() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Suspense fallback={<LoadingScreen progress={progress} />}>
      <App />
    </Suspense>
  );
}

root.render(<AppLoader />);
