// app/api/spotify/top-tracks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import axios, { AxiosError } from "axios";

type SpotifyApiError = {
  error: {
    status: number;
    message: string;
  };
}

export async function GET(request: NextRequest) {
  console.log("--top-tracks--");
  const session = await auth();

  // クエリパラメータの取得
  const searchParams = request.nextUrl.searchParams;
  const item = searchParams.get("type") || "tracks";
  const limit = searchParams.get("limit") || "20";
  const timeRange = searchParams.get("time_range") || "medium_term";

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  } else if (session.error === "TokenExpired") {
    return NextResponse.json({message: "アクセストークンの有効期限が切れました。再度サインインしてください。"}, {status: 403});
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/${item}`,
      {
        params: { 
          limit: limit,
          time_range: timeRange
         },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<SpotifyApiError>;
      
      if (axiosError.response) {
        // サーバーからのレスポンスがある場合
        const status = axiosError.response.status;
        const message = axiosError.response.data?.error?.message || 'Unknown error occurred';

        switch (status) {
          case 401:
            console.error('Unauthorized: Access token is invalid or expired');
            throw new Error('Your session has expired. Please log in again.');
          case 403:
            console.error('Forbidden: Insufficient permissions');
            throw new Error('You do not have permission to access this resource.');
          case 429:
            console.error('Too Many Requests: Rate limiting applied');
            throw new Error('Too many requests. Please try again later.');
          default:
            console.error(`API Error (${status}): ${message}`);
            throw new Error(`An error occurred while fetching your top ${item}. Please try again.`);
        }
      } else if (axiosError.request) {
        // リクエストは作成されたがレスポンスを受け取れなかった場合
        console.error('No response received:', axiosError.request);
        throw new Error('Unable to reach Spotify servers. Please check your internet connection.');
      } else {
        // リクエストの設定中にエラーが発生した場合
        console.error('Error setting up the request:', axiosError.message);
        throw new Error('An error occurred while setting up the request. Please try again.');
      }
    } else {
      // 非Axiosエラーの場合
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
}
