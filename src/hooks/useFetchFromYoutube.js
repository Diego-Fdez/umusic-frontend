import { useEffect, useState } from 'react';
import videoStore from '@/store/videoStore';

export function useFetch(url) {
  const baseURL = 'https://youtube138.p.rapidapi.com';
  const addVideos = videoStore((state) => state.addVideos);
  const loading = videoStore((state) => state.setLoading);
  const setError = videoStore((state) => state.setError);
  const [getData, setGetData] = useState([]);

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

    loading(true);
    /* Fetching the data from the API and setting the data to the state. */
    fetch(`${baseURL}/${url}`, options, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setGetData(data), addVideos(data?.contents), setError(data);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request was cancelled');
        }
        setError(error);
      })
      .finally(() => loading(false));

    /* Returning a function that is called when the component is unmounted. */
    return () => abortController.abort();
  }, [url]);

  return { getData };
}
