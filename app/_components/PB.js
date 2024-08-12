// "use client";
// import React from "react";
// import useApiFetch from "../_hooks/useApiFetch";

// const ProgressBar = ({ className, ...props }) => {
//   const {
//     data: currentProgressData,
//     loading,
//     error,
//   } = useApiFetch("/api/spotify", 2000);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching data</div>;

//   const progressData = currentProgressData.progressData;
//   const percentage = progressData
//     ? (progressData.progress_ms / progressData.item.duration_ms) * 100
//     : 0;

//   return (
//     <div className={`${className} h-[6px]`} {...props}>
//       <div
//         className="duration-2000 h-full rounded-full bg-red-500 transition-all ease-linear"
//         style={{ width: `${percentage}%` }}
//       ></div>
//     </div>
//   );
// };

// export default ProgressBar;
