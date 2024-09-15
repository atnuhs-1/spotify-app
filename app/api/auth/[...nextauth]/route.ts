// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

// import NextAuth from 'next-auth';
// import { NextAuthOptions } from 'next-auth';
// import SpotifyProvider from 'next-auth/providers/spotify';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.SPOTIFY_CLIENT_ID!,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
//       authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-top-read',
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };