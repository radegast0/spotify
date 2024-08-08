import gsap from "gsap";
import React, { useEffect, useRef, forwardRef } from "react";

const CameraRig = forwardRef(({ children }, ref) => {
  const rigRef = ref || useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      gsap.to(rigRef.current.rotation, {
        x: y * 0.1,
        y: x * 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <group ref={rigRef}>{children}</group>;
});

export default CameraRig;
