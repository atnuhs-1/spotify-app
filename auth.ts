import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import type { NextAuthConfig } from "next-auth";
import { debugJwtCallback, debugTokenExpiration, refreshAccessToken } from "@lib/auth-function";

const config = {
  providers: [
    Spotify({
      authorization:
        /* params:{scope:"user-read-private user-read-recently-played user-top-read"}はだめだった*/
        "https://accounts.spotify.com/authorize?scope=user-read-email, user-read-private, user-read-recently-played, user-top-read",
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, account, user, profile }) {
      console.log("--jwt--")
      // debugJwtCallback(token, trigger);
      debugTokenExpiration(token);
      // console.log("token: ", token);
      // console.log("user: ", user);
      if (account && profile) {
        console.log("Initial sign in");
        console.log("before-token: ", token);
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
        token.user = {
          id: profile.id as string,
          name: profile.display_name as string,
          email: profile.email as string,
        };
        console.log("after-token: ", token);
        return token;
      } else if (Date.now() < (token.expires_at as number) * 1000) {
        console.log("トークン期限切れてない");
        return token;
      } else {
        console.log("トークン期限切れ");
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      // sessionにuserを追加してないのにuserが存在してるのはなんで？（予想：authorizationされた段階でsession.userに追加されてるぽい）
      console.log("--session--");
      session.access_token = token.access_token as string;
      session.error = token.error as string;
      return session;
    },
  },
  // trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
