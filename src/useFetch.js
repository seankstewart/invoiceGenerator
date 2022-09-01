import {useCallback, useEffect, useRef, useState} from "react";

const useFetch = (url, withInterval = false) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
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
        // alert('Sorry. BitPay could not get the rates.')
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const refetch = useCallback(() => {
    setLoading(true);
    getData();
  },[getData])

  const startInterval = useCallback((ms) => {
    return setInterval(refetch, ms)
  }, [refetch]);

  useEffect(() => {
    setLoading(true);
    const waitForDataLoad = async () => {
      getData();
    }
    waitForDataLoad();
  }, [getData]);

  useEffect(() => {

    if (loading === false) {
      console.log('------ NEW INETRVAL STARTED --------')
      // intervalRef.current = startInterval(5000);
      
      const id = setInterval(() => {
        console.log(intervalRef.current)
        getData();
      }, 5000);
      intervalRef.current = id;
      return () => {
        clearInterval(intervalRef.current);
      };

    }

    // return () => clearInterval(intervalRef.current);
  }, [loading, getData])
  // }, [getData])
   
 
  return {data, loading, error, refetch, startInterval, intervalRef} // we return the state and data we fetched // return refetch here
}

export default useFetch;