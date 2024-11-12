import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddToQueueButton = ({ songUri }) => {
  const [status, setStatus] = useState(null);

  const addToQueue = async () => {
    // Check if songUri is provided
    if (!songUri) {
      setStatus("No song URI provided.");
      return;
    }

    try {
      const response = await axios.post("/api/spotify", { songUri });
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

AddToQueueButton.propTypes = {
  songUri: PropTypes.string,
}
export default AddToQueueButton;

