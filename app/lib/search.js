import axios from "axios";

export async function searchSpotify(accessToken, query) {
  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: query,
      type: "track",
      limit: 6,
    },
  });

  return response.data.tracks.items;
}
