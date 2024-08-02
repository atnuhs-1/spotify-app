// declare module 'spotify-web-api-node' {
//     export interface TokenResponse {
//       access_token: string;
//       refresh_token?: string;
//       expires_in: number;
//     }
  
//     export default class SpotifyWebApi {
//       constructor(options?: {
//         clientId?: string;
//         clientSecret?: string;
//         redirectUri?: string;
//       });
  
//       setAccessToken(accessToken: string): void;
//       getAccessToken(): string | null;
//       getRefreshToken(): string | null;
//       refreshAccessToken(): Promise<{ body: TokenResponse }>;
//       getMyTopArtists(options?: { limit?: number; }): Promise<{ body: { items: Array<any>; }; }>;
//       createAuthorizeURL(scopes: string[], state?: string): string;
//       authorizationCodeGrant(code: string): Promise<{ body: TokenResponse }>;
//     }
//   }
  