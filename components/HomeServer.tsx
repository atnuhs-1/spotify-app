import { fetchTopItems } from "@/app/lib/data";
import { auth } from "@/auth";
import { Artist, Track } from "@/types/data";
import Image from "next/image";
import Link from "next/link";
import ErrorPage from "./ErrorPage";

export default async function HomeServer() {
  const session = await auth();
  let tracks: Track[];
  let artists: Artist[];

  if (session?.error === "TokenExpired") {
    return <ErrorPage message="アクセストークンの有効期限が切れました。再度サインインしてください。"/>
  }

  if (session?.access_token) {
    tracks = await fetchTopItems("tracks", "5", session?.access_token);
    artists = await fetchTopItems("artists", "5", session?.access_token);
  } else {
    return <ErrorPage />;
  }

  //   console.log(tracks);
  //   console.log(artists);

  if (!tracks || !artists) {
    return <div>not</div>;
  }

  return (
    <div className="bg-slate-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-bold text-xl sm:text-2xl mb-4 sm:mb-5">
          Home
        </h1>
        <div className="flex flex-col gap-6 sm:gap-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-600 text-lg sm:text-2xl">
                トップトラック
              </h2>
              <Link
                href={`/top-tracks`}
                className="text-sm sm:text-base text-slate-500 border-b border-white hover:border-slate-500"
              >
                すべて表示
              </Link>
            </div>

            <div className="overflow-x-auto pb-4">
              <ol className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-y-20 w-max lg:w-full">
                {tracks.map((track, index) => (
                  <li key={index} className="flex-shrink-0 w-[160px]">
                    {track.album.images.length > 0 && (
                      <Image
                        width={160}
                        height={160}
                        src={track.album.images[0].url}
                        alt={track.name}
                        className="rounded-md w-full h-auto"
                      />
                    )}
                    <div className="w-full mt-2">
                      <p className="text-sm font-medium truncate">
                        {track.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-600 text-lg sm:text-2xl">
                トップアーティスト
              </h2>
              <Link
                href={`/top-artists`}
                className="text-sm sm:text-base text-slate-500 border-b border-white hover:border-slate-500"
              >
                すべて表示
              </Link>
            </div>

            <div className="overflow-x-auto pb-4">
              <ol className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-y-20 w-max lg:w-full">
                {artists.map((artist, index) => (
                  <li key={index} className="flex-shrink-0 w-[160px]">
                    {artist.images.length > 0 && (
                      <Image
                        width={160}
                        height={160}
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="rounded-full w-full h-auto"
                      />
                    )}
                    <div className="w-full mt-2">
                      <p className="text-sm font-medium truncate text-center">
                        {artist.name}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {session ? (
            <Link href="/profile" className="mt-6 sm:mt-10">
              <div className="max-w-2xl mx-auto shadow-lg bg-white rounded-xl">
                <div className="p-4 sm:p-6 md:p-10">
                  <div className="flex items-center gap-4 sm:gap-10">
                    <Image
                      className="rounded-full shadow-xl w-16 h-16 sm:w-20 sm:h-20"
                      src={session.user.image}
                      alt="Profile"
                      width={80}
                      height={80}
                    />
                    <div className="flex flex-col gap-2 sm:gap-4">
                      <p className="font-semibold text-lg sm:text-xl text-slate-400">
                        プロフィール
                      </p>
                      <p className="font-bold text-3xl sm:text-5xl md:text-7xl text-slate-400">
                        {session.user.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-center mt-6 sm:mt-10 text-slate-500 hover:text-slate-700"
            >
              サインイン
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
