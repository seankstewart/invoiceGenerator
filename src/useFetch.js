import {useCallback, useEffect, useState} from "react";

const useFetch = (urlArg) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(urlArg);

  const getData = useCallback(async () => {
    await fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(url)
        console.log(json)
        setData(json);
      })
      .catch(e => {
        console.log(e)
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [url]);

  useEffect(() => {
    if (url !== urlArg) {
      setUrl(urlArg);
      setData(null);
      setLoading(true);
    }

    if ((data === null && loading === true && urlArg !== "")) {
      getData();
    }
  }, [data, loading, getData, url, urlArg])

  return {data, loading, error}

}

export default useFetch;