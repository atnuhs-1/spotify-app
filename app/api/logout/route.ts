// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect('/');
  // クッキーを空にして再設定し、セッションクッキーを無効化
  response.cookies.set('spotify_access_token', '', { path: '/', expires: new Date(0) });
  response.cookies.set('spotify_user', '', { path: '/', expires: new Date(0) });
  return response;
}
