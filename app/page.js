"use client";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";

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
      <Analytics />
    </div>
  );
}
