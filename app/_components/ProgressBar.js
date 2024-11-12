"use client";
import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progressMs, durationMs }) => {
  const percentage = progressMs ? (progressMs / durationMs) * 100 : 0;

  return (
    <div className="h-[6px] w-full rounded-r-full bg-white">
      <div
        className="h-full bg-red-500 transition-all duration-4000 ease-linear"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progressMs: PropTypes.number,
  durationMs: PropTypes.number,
};

export default ProgressBar;
