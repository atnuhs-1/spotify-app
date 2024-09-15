import axios from "axios";

export const fetchTopItems = async (
  item: "tracks" | "artists",
  limit: string,
  access_token: string
) => {
  const params = new URLSearchParams({
    limit: limit,
  });

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/${item}`,
      {
        params: { limit },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error: ", error.response?.data);

      throw new Error(`Failed to fetch top ${item}: ${error.message}`);
    } else {
      console.error("Unexpected error: ", error);
      throw error;
    }
  }
};
