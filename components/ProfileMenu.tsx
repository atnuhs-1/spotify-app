// components/ProfileMenu.tsx
"use client"; // クライアントサイドのインタラクションを扱うため必要

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileMenu({ profileImage }: { profileImage: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    fetch('/api/logout')
      .then(() => {
        window.location.href = "/";
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  }
  
  


  return (
    <div className="relative" ref={menuRef}>
      <img
        src={profileImage}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleMenu}
      
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
