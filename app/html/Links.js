"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import useStore from "../store";
import PropTypes from "prop-types";

const Links = ({ openModal, openModal2 }) => {
  // const link1Ref = useRef(null);
  // const link2Ref = useRef(null);
  const modal = useRef(null);
  const modal2 = useRef(null);
  const monitorIndex = useStore((state) => state.monitorIndex);
  const isVinylSelected = useStore((state) => state.isVinylSelected);

  // console.log("monitorIndex", monitorIndex);
  // console.log("isVinylSelected", isVinylSelected);

  useEffect(() => {
    if (modal.current && modal2.current) {
      gsap.set([modal.current, modal2.current], {
        x: -200,
        opacity: 0,
      });
      gsap.to([modal.current, modal2.current], {
        x: 0,
        opacity: 1,
        delay: 2.5,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.35,
      });
    }
  }, [modal, modal2]);

  return (
    !monitorIndex &&
    monitorIndex !== 0 &&
    !isVinylSelected && (
      <>
        {/* <div className="absolute bottom-2 left-2 z-10 md:bottom-10 md:left-10">
          <div className="flex flex-col gap-2 text-base font-semibold drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] md:gap-1 md:text-lg">
            <Link
              className=""
              ref={link1Ref}
              target="_blank"
              href={"https://portfolio-flame-tau-43.vercel.app/"}
            >
              <span className="flex items-center gap-2">
                Portfolio <FiArrowUpRight />
              </span>
            </Link>
            <Link
              ref={link2Ref}
              target="_blank"
              href={
                "https://open.spotify.com/user/mot%C3%B6rkafa?si=ueGATfW7SXuE12f1i54p9w"
              }
            >
              <span className="flex items-center gap-2">
                Spotify Profile <FiArrowUpRight />
              </span>
            </Link>
          </div>
        </div> */}
        <div className="absolute bottom-2 left-2 z-10 md:bottom-10 md:left-10">
          <div className="flex flex-col gap-2 text-base font-semibold drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] md:gap-1 md:text-lg">
            <button
              ref={modal}
              onClick={openModal}
              className="text-start transition-colors duration-300 hover:cursor-pointer hover:text-spotify-green"
            >
              Add Song to My Queue
            </button>
            <button
              className="text-start transition-colors duration-300 hover:cursor-pointer hover:text-spotify-green"
              ref={modal2}
              onClick={openModal2}
            >
              Add Song to Public Playlist
            </button>
          </div>
        </div>
      </>
    )
  );
};

Links.propTypes = {
  openModal: PropTypes.func.isRequired,
  openModal2: PropTypes.func.isRequired,
};
export default Links;
