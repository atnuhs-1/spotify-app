import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // クッキーからユーザー情報を取得
  const userCookie = cookies().get('spotify_user');

  if (!userCookie) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // JSON形式のユーザー情報を返す
  const user = JSON.parse(userCookie.value);
  return NextResponse.json(user);
}
