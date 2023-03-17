import videoStore from '@/store/videoStore';

const UseFetchFromDB = () => {
  const loading = videoStore((state) => state.setLoading);
  const addVideoList = videoStore((state) => state.addVideoList);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

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
    loading(true);
    const result = fetch(url, options, {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error)
      .finally(() => loading(false));

    return result;
  }

  /**
   * GetVideoList is an async function that fetches data from the database and adds it to the video
   * list.
   */
  async function getVideoList(id) {
    try {
      const result = await fetchFromDB(`${baseURL}/room/${id}`, 'GET');
      addVideoList(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  return { baseURL, fetchFromDB, getVideoList };
};

export default UseFetchFromDB;
