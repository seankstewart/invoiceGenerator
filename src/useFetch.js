import {useCallback, useEffect, useState} from "react";

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    await fetch(url)
      .then(response => response.json())
      .then(json => {
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
    if (data === null && loading === true) {
      getData();
    }
  }, [data, loading, getData])

  return {data, loading, error}
}

export default useFetch;