import Experience from "./experience/Experience";
import Overlay from "./html/Overlay";

export default function Home() {
  return (
    <div className="h-dvh w-dvw">
      <Overlay />
      <Experience />
    </div>
  );
}
