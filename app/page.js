import RecentlyPlayed from "./_components/RecentlyPlayed";
import CurrentlyPlaying from "./_components/CurrentlyPlaying";
import Experience from "./experience/Experience";
import GetSongs from "./_components/GetSongs";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      {/* <div className="z-10">
        <RecentlyPlayed />
        <CurrentlyPlaying />
      </div> */}
      {/* <GetSongs /> */}
      <Experience />
    </div>
  );
}
