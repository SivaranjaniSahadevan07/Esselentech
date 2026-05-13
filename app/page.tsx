import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { HomeContent } from '@/components/HomeContent';

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );
}