// app/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.email}</h1>
      <p>You are signed in with Spotify.</p>
      <Link href="/api/auth/signout">Sign out</Link>
    </div>
  );
}
