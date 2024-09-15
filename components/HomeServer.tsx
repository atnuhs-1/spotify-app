import { fetchTopItems } from "@/app/lib/data";
import { auth } from "@/auth";
import { Artist, Track } from "@/types/data";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ErrorPage from "./ErrorPage";

export default async function HomeServer() {
  const session = await auth();
  let tracks: Track[];
  let artists: Artist[];

  if (session?.access_token) {
    tracks = await fetchTopItems("tracks", "5", session?.access_token);
    artists = await fetchTopItems("artists", "5", session?.access_token);
  } else {
    return <ErrorPage />
  }

  //   console.log(tracks);
  //   console.log(artists);

  if (!tracks || !artists) {
    return <div>not</div>;
  }

  return (
    <div className="bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-5">Home</h1>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h2 className="font-bold text-slate-600 text-2xl">
              トップトラック
            </h2>
            <Link
              href={`/top-tracks`}
              className="text-slate-500 border-b border-white hover:border-slate-500"
            >
              すべて表示
            </Link>
          </div>

          <ol className="grid grid-cols-5 gap-y-20 justify-items-center">
            {tracks.map((track, index) => (
              <li key={index} className="flex flex-col items-center w-[160px]">
                {track.album.images.length > 0 && (
                  <Image
                    width={160}
                    height={160}
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="rounded-md"
                  />
                )}
                <div className="w-full mt-4">
                  <p className="text-md font-medium truncate">{track.name}</p>
                  <p className="text-gray-500">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex justify-between">
            <h2 className="font-bold text-slate-600 text-2xl">
              トップアーティスト
            </h2>
            <Link
              href={`/top-artists`}
              className="text-slate-500 border-b border-white hover:border-slate-500"
            >
              すべて表示
            </Link>
          </div>

          <ol className="grid grid-cols-5 gap-y-20 justify-items-center">
            {artists.map((artist, index) => (
              <li key={index} className="flex flex-col items-center w-[160px]">
                {artist.images.length > 0 && (
                  <Image
                    width={160}
                    height={160}
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="rounded-full"
                  />
                )}
                <div className="w-full mt-4">
                  <p className="text-md font-medium truncate">{artist.name}</p>
                  {/* <p className="text-gray-500">
                  {artist.artists.map((artist) => artist.name).join(", ")}
                </p> */}
                </div>
              </li>
            ))}
          </ol>

          {session ? (
            <>
              <Link href="/profile" className="mt-10">
                <div className="">
                  <div className="max-w-2xl mx-auto shadow-lg bg-white rounded-xl flex flex-col">
                    <div className="m-10">
                      <div className="flex items-center gap-10">
                        <Image
                          className=" rounded-full shadow-xl"
                          src={session.user.image}
                          alt="Profile"
                          width={80}
                          height={80}
                        />
                        <div className="flex flex-col gap-4">
                          <p className="font-semibold text-xl text-slate-400">
                            プロフィール
                          </p>
                          <p className="font-bold text-7xl text-slate-400">
                            {session.user.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin">サインイン</Link>
          )}
        </div>
      </div>
    </div>
  );
}
