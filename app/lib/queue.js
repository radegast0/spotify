import axios from "axios";

export async function addSongToQueue(accessToken, songUri) {
  await axios.post(
    "https://api.spotify.com/v1/me/player/queue",
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { uri: songUri },
    }
  );
}
