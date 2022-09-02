import {useCallback, useEffect, useRef, useState} from "react";

const useFetch = (url, withInterval = false) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(withInterval);
  const [error, setError] = useState(null);
  let intervalRef = useRef();

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

  const refetch = useCallback(() => {
    getData();
  },[getData])

  const startInterval = useCallback((ms) => {
    return setInterval(refetch, ms)
  }, [refetch]);

  useEffect(() => {
    console.log('------ NEW INETRVAL STARTED --------');
    const id = startInterval(5000);
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [startInterval])
   
  return {data, loading, error, refetch, intervalRef}
}

export default useFetch;