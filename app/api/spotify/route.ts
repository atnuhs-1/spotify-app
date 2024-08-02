import { NextResponse } from 'next/server';
import querystring from 'querystring';

export async function GET() {
  const SPOTIFY_CLIENT_ID = '529e0412d0fa4602bf835e8dcd932723';
  const SPOTIFY_CLIENT_SECRET = '137e192d88b9478f895641e7a259c3b3';

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return NextResponse.json({ error: 'Missing Spotify credentials' }, { status: 500 });
  }

  // アクセストークンを取得するためのリクエスト
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET
  });

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: tokenData }, { status: tokenResponse.status });
    }

    const accessToken = tokenData.access_token;

    // アーティスト情報を取得するためのリクエスト
    const artistId = '19hnen14uXCUMoBAnTmrCp';  // 取得したいアーティストのIDを指定
    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const artistData = await artistResponse.json();

    if (!artistResponse.ok) {
      return NextResponse.json({ error: artistData }, { status: artistResponse.status });
    }

    return NextResponse.json(artistData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from Spotify API' }, { status: 500 });
  }
}
