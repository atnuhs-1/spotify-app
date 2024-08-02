  // utils/auth.ts
export function getSpotifyAuthUrl() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
  const scopes = [
    'user-top-read', // トップトラックを取得するために必要なスコープ
  ].join(' ');

  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}
