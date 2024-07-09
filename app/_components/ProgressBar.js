import axios from "axios";
import React, { useEffect, useState } from "react";

const ProgressBar = ({ className, ...props }) => {
  const [currentProgress, setCurrentProgress] = useState(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/spotify");
        const { progressData } = response.data;
        if (progressData) {
          setCurrentProgress(progressData);
          setPercentage(
            (progressData.progress_ms / progressData.item.duration_ms) * 100
          );
        } else {
          setCurrentProgress("No progress data available");
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // console.log(currentProgress);
  // console.log(percentage);

  return (
    <div className={`${className} h-[6px]`} {...props}>
      <div
        className="h-full bg-red-500 transition-all duration-1000 ease-linear rounded-r-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
