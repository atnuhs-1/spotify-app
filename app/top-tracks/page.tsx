// app/top-tracks/page.tsx
"use client";

import { useEffect, useState } from 'react';

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

export default function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    async function fetchTopTracks() {
      const res = await fetch('/api/top-tracks');
      const data = await res.json();
      setTracks(data.items || []);
    }

    fetchTopTracks();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center">Your Top Tracks</h1>
        {tracks.length > 0 ? (
          <ol className="space-y-4">
            {tracks.map((track, index) => (
              <li key={index} className="flex items-center space-x-4">
                {track.album.images.length > 0 && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-16 h-16 rounded-lg"
                  />
                )}
                <div>
                  <p className="text-lg font-medium">{track.name}</p>
                  <p className="text-gray-500">{track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No top tracks found.</p>
        )}
      </div>
    </div>
  );
}
