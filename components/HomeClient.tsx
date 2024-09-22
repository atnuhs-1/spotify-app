"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

// トップトラック、アーティスト、プロフィールのまとめ、いろんなページへのリンク
// api/top-tracksの引数にトラックの数を渡せるようにしたい

export default function HomeSession() {
  const [tracks, setTracks] = useState<Track[]>([]);

  const session = useSession();

  useEffect(() => {
    async function fetchTopTracks() {
      const res = await fetch("/api/top-tracks");
      const data = await res.json();
      console.log("data: ", data);
      setTracks(data.items || []);
    }

    fetchTopTracks();
  }, []);

  return (
    <div className="mx-10 mt-10">
      <h1 className="text-center font-bold text-2xl mb-10">Home</h1>
      <ol className="grid grid-cols-6 gap-y-20 justify-items-center">
      {tracks.map((track,index) => (
        <li key={index} className="flex flex-col items-center w-[160px]">
        {track.album.images.length > 0 && (
          <Image
            width={160}
            height={160}
            src={track.album.images[0].url}
            alt={track.name}
            className=""
          />
        )}
        <div className='w-full mt-4'>
          <p className="text-md font-medium truncate">{track.name}</p>
          <p className="text-gray-500">{track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </li>
      ))}

      </ol>
      
      {session ? (
        <>
          <Link href="/profile">プロフィールを見る</Link>
        </>
      ) : (
        <Link href="/api/auth/signin">サインイン</Link>
      )}
    </div>
  );
}
