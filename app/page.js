"use client";
import dynamic from "next/dynamic";

const Experience = dynamic(() => import("./experience/Experience"), {
  ssr: false,
});

const Overlay = dynamic(() => import("./html/Overlay"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-dvh w-dvw">
      <Overlay />
      <Experience />
    </div>
  );
}
