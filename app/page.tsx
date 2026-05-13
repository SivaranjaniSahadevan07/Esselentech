import Navbar from '@/components/Navbar';
import { HomeContent } from '@/components/HomeContent';

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
      <Navbar />
      <HomeContent />
    </main>
  );
}