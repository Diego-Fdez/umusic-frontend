import { useState } from 'react';
import videoStore from '@/store/videoStore';

const UseFetchFromDB = () => {
  const addVideoList = videoStore((state) => state.addVideoList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * It fetches data from a database and returns the data.
   * @returns The result of the fetch call.
   */
  async function fetchFromDB(url, method, setData) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(setData),
    };

    /* Creating a new instance of the AbortController class. */
    const abortController = new AbortController();
    setLoading(true);
    const result = fetch(url, options, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    return result;
  }

  return { fetchFromDB, loading, error };
};

export default UseFetchFromDB;
