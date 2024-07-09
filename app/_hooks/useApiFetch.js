import { useState, useEffect } from "react";
import axios from "axios";

const useApiFetch = (url, interval = 60000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isInitialFetch) {
        setLoading(true);
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
        setIsInitialFetch(false);
      } catch (err) {
        setError(err);
      } finally {
        if (isInitialFetch) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [url, interval, isInitialFetch]);

  return { data, loading, error };
};

export default useApiFetch;
