import RecentlyPlayed from "./_components/RecentlyPlayed";
import CurrentlyPlaying from "./_components/CurrentlyPlaying";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <h1>Recently Played Songs</h1>
      <RecentlyPlayed />
      <h1>Currently Playing</h1>
      <CurrentlyPlaying />
    </div>
  );
}
