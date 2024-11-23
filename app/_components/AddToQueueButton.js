import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddToQueueButton = ({ songUri }) => {
  const [status, setStatus] = useState(null);

  const addToQueue = async () => {
    if (!songUri) return setStatus("No song URI provided.");

    try {
      await axios.post("/api/spotify", { songUri });
      setStatus("Song added to the queue!");
    } catch {
      setStatus("Failed to add song to queue.");
    }
  };

  return (
    <div>
      <button onClick={addToQueue}>Add to Queue</button>
      {status && <p>{status}</p>}
    </div>
  );
};

AddToQueueButton.propTypes = {
  songUri: PropTypes.string.isRequired,  // Ensures songUri is always provided
};

export default AddToQueueButton;
