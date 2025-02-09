"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useVantaBackground } from '@/hooks/useVantaBackground';

export default function MainMenu() {
  const backgroundRef = useVantaBackground();

  return (
    // The outer container gets the Vanta background
    <div ref={backgroundRef} className="relative min-h-screen overflow-hidden">
      {/* The inner container holds the menu content above the Vanta background */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Replace the text title with the logo image */}
        <Image
          src="/logo/logo_mialexi_test.png"
          alt="Mialexi Logo"
          width={300}     // Adjust the size as needed to make it "very very big"
          height={300}
          className="mb-8"
        />
        <ul className="space-y-4 text-center">
          <li>
            <Link href="/play">
              <span className="text-blue-300 hover:underline cursor-pointer text-2xl">Play</span>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <span className="text-blue-300 hover:underline cursor-pointer text-2xl">Settings</span>
            </Link>
          </li>
          <li>
            <Link href="/credits">
              <span className="text-blue-300 hover:underline cursor-pointer text-2xl">Credits</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
