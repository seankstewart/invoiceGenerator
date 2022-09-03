import { useEffect, useLayoutEffect, useRef } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);
  
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback])
  
  // Set up the interval.
  useEffect(() => {
    
    // send delay value of null or 0 to clearInterval
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => {
      clearInterval(id)
    }
  }, [delay])
}

export default useInterval;