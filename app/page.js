"use client";
import dynamic from "next/dynamic";
import Overlay from "./html/Overlay";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

const Experience = dynamic(() => import("./experience/Experience"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="h-dvh w-dvw">
          <Overlay />
          <Experience />
        </div>
      </Suspense>
      <Loader /> {/* This ensures the loader wraps all content */}
    </>
  );
}
