import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getSpotifyProfile(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
}

export default async function ProfilePage() {
  console.log("-----------");
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!session.access_token) {
    return <div>アクセストークンがありません。再度ログインしてください。</div>;
  }

  const profile = await getSpotifyProfile(session.access_token as string);

  console.log(profile);

  if (profile.error) {
    console.error("Spotify API Error:", profile.error);
    return (
      <div>
        Spotify APIからのデータ取得に失敗しました: {profile.error.message}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <div className="max-w-2xl mx-auto shadow-lg bg-white rounded-xl flex flex-col">
        <div className="m-10">
          <div className="flex items-center gap-10">
            <Image
              className=" rounded-full shadow-xl"
              src={profile.images[1]?.url}
              alt="Profile"
              width="200"
              height="200"
            />
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-xl text-slate-400">
                プロフィール
              </p>
              <p className="font-bold text-7xl text-slate-400">
                {profile.display_name}
              </p>
              <p className="font-semibold text-base text-slate-400">
                {profile.followers.total}人のフォロワー
              </p>
            </div>
          </div>

          <div className="mt-8 text-slate-400">
            <p>Email</p>
            <p className="">{profile.email}</p>
            <p>Plan</p>
            <p className="">{profile.product}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
