'use client';

import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Slots Lobby</h1>
        <nav className="flex space-x-4">
          <Link href="/" className="text-white hover:text-blue-400">
            Home
          </Link>
          <Link href="/profile" className="text-white hover:text-blue-400">
            Profile
          </Link>
          <Link href="/logout" className="text-white hover:text-blue-400">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
};
