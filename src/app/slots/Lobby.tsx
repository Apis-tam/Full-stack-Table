'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from './components/Header';
import slotStarImg from '../../../public/images/slot-star.avif';

const slotGames = [{ id: 1, name: 'Star Spinner', image: slotStarImg }];

export const Lobby = () => {
  const [user, setUser] = useState({ name: 'Player', balance: 1000 }); // Mock user data

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <Header />
      {/* Main Content */}
      <main className="flex-grow mx-auto py-8 w-full ">
        <h2 className="text-3xl font-semibold text-center mb-8">Choose Your Slot Game</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {slotGames.map((game) => (
            <Link key={game.id} href={`/slots/${game.id}`} className="group">
              <div className="flex flex-col items-center bg-gray-700 rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-200 p-2">
                <Image
                  src={game.image}
                  alt={game.name}
                  width={300}
                  height={200}
                  className=" h-48 object-cover"
                />
                <div className="p-4 text-center w-full">
                  <h3 className="text-lg font-semibold">{game.name}</h3>
                  <p className="text-sm text-gray-300">Play Now</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 mt-8 ">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Slots App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
