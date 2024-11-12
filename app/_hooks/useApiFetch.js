import { useState, useEffect } from "react";
import axios from "axios";

const useApiFetch = (url, interval = 10000, retries = 3, retryDelay = 2000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  useEffect(() => {
    const fetchData = async (attempt = 0) => {
      if (isInitialFetch) {
        setLoading(true);
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
        setIsInitialFetch(false);
      } catch (err) {
        if (err.response && err.response.status === 500 && attempt < retries) {
          // Retry with exponential backoff
          setTimeout(() => fetchData(attempt + 1), retryDelay * (attempt + 1));
        } else {
          setError(err);
        }
      } finally {
        if (isInitialFetch) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [url, interval, isInitialFetch, retries, retryDelay]);

  return { data, loading, error };
};

export default useApiFetch;
