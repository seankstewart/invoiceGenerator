import {useCallback, useEffect, useState} from "react";

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sleep = async (fn, par) => {
    return await setTimeout(async function() {
      await fn(par);
    }, 10000, fn, par);
  }
  
  const getData = async () => {
    await fetch(url)
      // await fetch('./rates.json')
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        setData(json);
        // setRates(json);
      })
      .catch(e => {
        console.log(e)
        setError(e);
        alert('Sorry. BitPay could not get the rates.')
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const refetch = useCallback(() => {
    console.log('re-fetching')
    setLoading(true);
    getData();
  },[])

  useEffect(() => {
    sleep(setLoading(true));
    getData();
  }, [url]);

  useEffect(() => {
    if (loading === false) {      
      setInterval(refetch, 5000);
    }
  }, [refetch, loading]);
   
 
  return {data, loading, error, refetch} // we return the state and data we fetched // return refetch here
}

export default useFetch;