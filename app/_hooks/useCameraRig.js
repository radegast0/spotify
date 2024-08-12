import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const useCameraRig = (controlsRef) => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const moveCamera = (
    position,
    target,
    duration = 1,
    ease = "power3.inOut",
  ) => {
    if (cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        ...position,
        duration,
        ease,
      });

      gsap.to(controlsRef.current.target, {
        ...target,
        duration,
        ease,
        onUpdate: () => {
          controlsRef?.current?.update();
        },
      });
    }
  };

  return moveCamera;
};

export default useCameraRig;
