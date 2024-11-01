'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
      setIsOpen(!isOpen);
  };

  return (
    <nav className="layout flex items-center text-lg justify-between pt-8 w-full">
      <Link href="/" className="hover:underline">
        <div className="flex gap-4 justify-center items-center">
          <img height={48} width={48} src="/images/lfdt.png"/>
          <p className="h-fit font-black">Les Fous des Tours</p>
        </div>
      </Link>
      <div className="hidden lg:flex justify-between space-x-4">
        <Link href="/a-propos" className="hover:underline">
          A propos
        </Link>
        <Link href="/evenements" className="hover:underline">
          Evenements
        </Link>
        <Link href="/#projects" className="hover:underline">
          Tournoi inter-universitaire
        </Link>
      </div>
      <div className="lg:hidden"  >
        <a href="#" onClick={handleClick}><Menu size={24}/></a>
      </div>
      {isOpen && (
        <div className="fixed h-screen w-screen overscroll-none left-0 top-0 bg-white max-w-7xl mx-auto px-5">
          <nav className="layout flex items-center text-black text-lg justify-between pt-8 w-full">
            <Link href="/" className="hover:underline">
              <div className="flex gap-4 justify-center items-center">
                <img height={48} width={48} src="/images/lfdt.png"/>
                <p className="h-fit font-black">Les Fous des Tours</p>
              </div>
            </Link>
            <div className="lg:hidden"  >
              <a href="#" onClick={handleClick}><X size={24}/></a>
            </div>
          </nav>
          <div className="flex justify-center flex-col pt-8 gap-0">
            <Link href="/a-propos" className="hover:underline">
              <div className="py-2 border-y-2 border-[#E9D056]">
                <p className="text-xl font-semibold">
                  A propos
                </p>
              </div>
            </Link>
            <Link href="/evenements" className="hover:underline">
              <div className="py-2 border-b-2 border-[#E9D056]">
                <p className="text-xl font-semibold">
                  Evenements
                </p>
              </div>
            </Link>
            <Link href="/#projects" className="hover:underline">
              <div className="py-2 border-b-2 border-[#E9D056]">
                <p className="text-xl font-semibold">
                  Tournoi inter-universitaire
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
