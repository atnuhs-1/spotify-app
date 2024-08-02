// app/signin/page.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <p>You are not signed in.</p>
      <button onClick={() => signIn('spotify')}>Sign in with Spotify</button>
    </div>
  );
}
