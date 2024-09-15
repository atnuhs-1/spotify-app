import { JWT } from "next-auth/jwt";
import axios, { AxiosError } from "axios";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface SpotifyErrorResponse {
  error: string;
  error_description: string;
}

const AUTH_SPOTIFY_ID = process.env.AUTH_SPOTIFY_ID!;
const AUTH_SPOTIFY_SECRET = process.env.AUTH_SPOTIFY_SECRET!;

export const refreshAccessToken = async (token: JWT) => {
  console.log("Before-refresh:");
  debugTokenExpiration(token);
  if (!token.refresh_token) {
    console.error("Missing refresh token");
    return { ...token, error: "RefreshAccessTokenError" };
  }

  try {
    const data = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refresh_token as string,
    });

    const response = await axios.post<SpotifyTokenResponse>(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${AUTH_SPOTIFY_ID}:${AUTH_SPOTIFY_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    const newTokens = response.data;

    console.log("Token refreshed successfully");
    console.log("newTokens: ", newTokens);
    console.log("After-refresh:");

    // token.access_token = newTokens.access_token;
    // token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);
    // if (newTokens.refresh_token) {
    //     console.log("refresh_tokenあった");
    //     token.refresh_token = newTokens.refresh_token;
    // } else {
    //     console.log("refresh_tokenなし");
    //     token.refresh_token = token.refresh_token;
    // }

    // debugTokenExpiration(token);
    // return token;

    const returnToken = {
      ...token,
      access_token: newTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
      refresh_token: newTokens.refresh_token ?? token.refresh_token,
    };

    debugTokenExpiration(returnToken);

    return returnToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<SpotifyErrorResponse>;
      if (axiosError.response) {
        console.error("Failed to refresh token:", axiosError.response.data);

        // リフレッシュトークンが無効な場合、ユーザーを再認証させる
        if (axiosError.response.data.error === "invalid_grant") {
          console.log("Invalid refresh token, initiating re-authentication");
          return { ...token, error: "RequireReauthentication" };
        }
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
      } else {
        console.error("Error setting up request:", axiosError.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }

    // その他のエラーの場合
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

export const debugTokenExpiration = (token: JWT) => {
  const convertToJST = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  };

  if (token.expires_at && token.iat && token.exp) {
    console.log("--- Token Expiration Debug Info ---");
    console.log(
      `Access Token expires at: ${convertToJST(token.expires_at)} (JST)`
    );
    console.log(`JWT issued at: ${convertToJST(token.iat)} (JST)`);
    console.log(`JWT expires at: ${convertToJST(token.exp)} (JST)`);
    console.log("------------------------------------");
  }
};

let jwtCallCount = 0;

export function debugJwtCallback(token: JWT, trigger: string | undefined) {
  jwtCallCount++;
  console.log(`JWT Callback called ${jwtCallCount} times`);
  console.log(`Trigger: ${trigger}`);
  //   console.log(`Token:`, JSON.stringify(token, null, 2));
  console.log(`Stack trace:`, new Error().stack);
  console.log("-------------------");
}
