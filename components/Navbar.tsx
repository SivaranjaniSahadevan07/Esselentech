'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Plus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter text-red-600">
              PORTFOLIO
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Home</Link>
            <Link href="/?category=Design" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Design</Link>
            <Link href="/?category=Photography" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Photography</Link>
            <Link href="/admin" className="flex items-center space-x-1 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              <Plus size={18} />
              <span>Admin</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-red-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/?category=Design" className="block text-gray-700 hover:text-red-600 font-medium" onClick={() => setIsOpen(false)}>Design</Link>
          <Link href="/?category=Photography" className="block text-gray-700 hover:text-red-600 font-medium" onClick={() => setIsOpen(false)}>Photography</Link>
          <Link href="/admin" className="block text-gray-700 hover:text-red-600 font-medium" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
