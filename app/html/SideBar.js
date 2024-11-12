import React from "react";

const SideBar = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="hover:text-spotify-green text-green-400 transition-colors duration-300 hover:cursor-pointer"
    >
      {/* Add song to queue */}
    </div>
  );
});

export default SideBar;
