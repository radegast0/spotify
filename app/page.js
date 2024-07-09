import RecentlyPlayed from "./_components/RecentlyPlayed";
import CurrentlyPlaying from "./_components/CurrentlyPlaying";
import Experience from "./experience/Experience";

export default function Home() {
  return (
    <div className="">
      <div className="z-10">
        {/* <h1>Recently Played Songs</h1> */}
        <RecentlyPlayed />
        <h1>Currently Playing</h1>
        <CurrentlyPlaying />
      </div>
      {/* <Experience /> */}
    </div>
  );
}
