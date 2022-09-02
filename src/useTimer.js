import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
// import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);
  // const [id, setID] = useState(null);

  // console.log(`useInterval id=== ${id}`)

  // const clear = () => {
  //   console.log(`clear this id: ${id}`)
  //   // debugger;
  //   clearInterval(id);
  //   // setID(id);

  //   return id;
  // }

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback])
  
  // Remember the latest callback if it changes.
  // useIsomorphicLayoutEffect(() => {
  //   savedCallback.current = callback
  // }, [callback])

  // Set up the interval.
  useEffect(() => {
    
    console.log('------ NEW INTERVAL STARTED --------');

    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      console.log('delay', delay);
      debugger;
      return
    }

    //id = setInterval(() => savedCallback.current(), delay)

    // console.log('id', id);
    // debugger;
    // setID(setInterval(() => savedCallback.current(), delay));
    const id = setInterval(() => savedCallback.current(), delay);
    console.log('id', id);

    return () => {
      console.log(`clearInterval(id): ${clearInterval(id)}`)
      debugger;
      clearInterval(id)
    }
  }, [delay])

  // return {id, clear};
}

export default useInterval;