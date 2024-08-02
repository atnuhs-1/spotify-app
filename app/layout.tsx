// app/layout.tsx
import './globals.css';
import Header from '../components/Header';
import SessionProviderWrapper from '../components/SessionProviderWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Header />
          <main>{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
