import RecentlyPlayed from "./_components/RecentlyPlayed";
import CurrentlyPlaying from "./_components/CurrentlyPlaying";
import Experience from "./experience/Experience";
import GetSongs from "./_hooks/useCurrentSong";
import CanvasTest from "./experience/CanvasTest";
import RecentSongsInfo from "./_components/RecentSongsInfo";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      {/* <div className="z-10">
        <RecentlyPlayed />
        <CurrentlyPlaying />
      </div> */}
      <RecentSongsInfo />
      <CanvasTest />
    </div>
  );
}
