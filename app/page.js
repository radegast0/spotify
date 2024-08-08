import Experience from "./experience/Experience";
import Overlay from "./html/Overlay";

export default function Home() {
  return (
    <div className="h-dvh w-dvw">
      {/* <div className="z-10">
        <RecentlyPlayed />
        <CurrentlyPlaying />
      </div> */}
      <Overlay />
      <Experience />
    </div>
  );
}
