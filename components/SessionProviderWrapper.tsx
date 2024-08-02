// components/SessionProviderWrapper.tsx
'use client'; // クライアントコンポーネントとして指定

import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
