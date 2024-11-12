"use client";
import React, { useState } from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";
import Links from "./Links";
import SearchSong from "../_components/SearchSong";

const Overlay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-white">
      {/* <button onClick={openModal} className="fixed top-2 right-2 z-10"> open </button> */}
      <RecentSongsInfo />
      <CurrentSongInfo />
      <Links openModal={openModal} />
      <SearchSong isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Overlay;
