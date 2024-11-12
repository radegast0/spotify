import React, { useState } from "react";
import axios from "axios";

const AddToQueueButton = ({ songUri }) => {
  const [status, setStatus] = useState(null);

  const addToQueue = async () => {
    // Check if songUri is provided
    if (!songUri) {
      setStatus("No song URI provided.");
      return;
    }

    console.log("Adding to queue:", songUri); // Log the song URI for debugging

    try {
      const response = await axios.post("/api/spotify", { songUri });
      console.log("Song added to queue:", response); // Log the API response
      setStatus("Song added to the queue!");
    } catch (error) {
      console.error("Failed to add song to queue:", error); // Log the error
      setStatus("Failed to add song to queue.");
    }
  };

  return (
    <div>
      <button onClick={addToQueue}>Add to Queue</button>
      {status && <p>{status}</p>} {/* Show status message */}
    </div>
  );
};

export default AddToQueueButton;
