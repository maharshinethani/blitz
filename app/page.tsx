'use client';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';

import About from '@/components/sections/About';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <main className="bg-black min-h-screen">
          <Navbar />
          
          <About />
  
        </main>
      )}
    </>
  );
}
