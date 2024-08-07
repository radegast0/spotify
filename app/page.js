import RecentlyPlayed from "./_components/RecentlyPlayed";
import CurrentlyPlaying from "./_components/CurrentlyPlaying";
import Experience from "./experience/Experience";
import GetSongs from "./_hooks/useCurrentSong";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      {/* <div className="z-10">
        <RecentlyPlayed />
        <CurrentlyPlaying />
      </div> */}
      <Experience />
    </div>
  );
}
