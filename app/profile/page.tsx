"use client";

import { useEffect, useState } from 'react';

interface SpotifyUser {
  display_name: string;
  email: string;
  id: string;
  images: { url: string }[];
}

export default function UserProfile() {
  const [user, setUser] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/getUser');
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">User Profile</h1>
        {user ? (
          <div className="flex flex-col items-center text-center">
            {user.images && user.images.length > 0 ? (
              <img
                src={user.images[0].url}
                alt={user.display_name}
                className="w-32 h-32 rounded-full mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
            <h2 className="text-xl font-semibold">{user.display_name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 mt-2">ID: {user.id}</p>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
