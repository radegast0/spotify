"use client";
import React, { useState } from "react";
import RecentSongsInfo from "./RecentSongsInfo";
import CurrentSongInfo from "./CurrentSongInfo";
import Links from "./Links";
import SearchSong from "../_components/SearchSong";
import AddSongToPublicPlaylist from "../_components/AddSongToPublicPlaylist";

const Overlay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const openModal2 = () => setIsModal2Open(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModal2 = () => setIsModal2Open(false);

  return (
    <div className="text-white">
      {/* <button onClick={openModal} className="fixed top-2 right-2 z-10"> open </button> */}
      <RecentSongsInfo />
      <CurrentSongInfo />
      <Links openModal2={openModal2} openModal={openModal} />
      <SearchSong isOpen={isModalOpen} onClose={closeModal} />
      <AddSongToPublicPlaylist isOpen={isModal2Open} onClose={closeModal2} />
    </div>
  );
};

export default Overlay;
