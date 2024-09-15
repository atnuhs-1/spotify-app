import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {

    } & DefaultSession['user'];
    access_token?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    user?: {
      id?: string;
      name?: string;
      email?: string;
    }
    
  }
}