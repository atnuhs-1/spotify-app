// app/login/page.tsx
import React from 'react';
import { getSpotifyAuthUrl } from '../../utils/auth';

export default function Login() {
  const authUrl = getSpotifyAuthUrl();

  return (
    <div className="flex justify-center items-center h-screen">
      <a href={authUrl} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login with Spotify
      </a>
    </div>
  );
}
