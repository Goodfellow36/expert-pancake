'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
          <h1 className="text-xl font-bold">Team Give & Go</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium hover:text-green-100">Home</Link>
          <Link href="/mentors" className="font-medium hover:text-green-100">Find Mentors</Link>
          <Link href="#about" className="font-medium hover:text-green-100">About Us</Link>
        </div>

        <div className="flex items-center space-x-3">
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition">
            Log In
          </button>
          <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition">
            Sign Up
          </button>
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-green-600 md:hidden">
            <div className="px-4 py-2 space-y-2">
              <Link href="/" className="block py-2 hover:text-green-100">Home</Link>
              <Link href="/mentors" className="block py-2 hover:text-green-100">Find Mentors</Link>
              <Link href="#about" className="block py-2 hover:text-green-100">About Us</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
