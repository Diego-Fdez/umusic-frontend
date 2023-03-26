import { useEffect, useState } from 'react';
import videoStore from '@/store/videoStore';

export function useFetch(url) {
  const baseURL = 'https://youtube138.p.rapidapi.com';
  const addVideos = videoStore((state) => state.addVideos);
  const [getData, setGetData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /* This is the options object that is passed to the fetch method. */
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
    };

    /* Creating a new instance of the AbortController class. */
    const abortController = new AbortController();

    setLoading(true);
    /* Fetching the data from the API and setting the data to the state. */
    fetch(`${baseURL}/${url}`, options, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setGetData(data), addVideos(data?.contents);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request was cancelled');
        }
        setError(error);
      })
      .finally(() => setLoading(false));

    /* Returning a function that is called when the component is unmounted. */
    return () => abortController.abort();
  }, [url]);

  return { getData, loading, error };
}
