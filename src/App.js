import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import API from './api/api';
import './App.scss';
import Table from './components/table/Table';
import useFetch from './useFetch';
import useTimer from './useTimer';

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
}

const App = () => {

  const [state, setState] = useState(null);
  const [rates, setRates] = useState(null);

  const ratesData = useFetch('https://bitpay.com/api/rates');

  const timer = useTimer(() => updateData(null).then((res) => {
    setState({...state, isPending: false, model: res})
  }), (state !== null && state.mode === 'edit') ? null : 5000);

  console.log('timer', timer);
  // debugger;

  const updateData = async (data) => {
    if (data === null) {
      return await Promise.all(state.model.map(async (d) => {
        const code = d.currentcy;
        const ratesUSD = await new API().getRatesToUSD(code);
        d.priceCypto = ratesUSD;
        d.amountUSD = d.priceCypto * d.amountCypto;
        console.log(d)
        return d;
      }));
    }
    return await Promise.all(data.map(async (d) => {
      const code = d.currentcy;
      const ratesUSD = await new API().getRatesToUSD(code);
      d.priceCypto = ratesUSD;
      d.amountUSD = d.priceCypto * d.amountCypto;
      console.log(d)
      return d;
    }));
  }

  useEffect(() => {
    console.log('start right here');
    let data = null;
    if (state === null) {
      data = new API().defaultData;
      updateData(data).then((res) => {
        setState({mode: 'read', model: res, isPending: true})
      });
    }
  }, [])

  useEffect(() => {
    console.log(state);
    console.log('state just updated');
    debugger;

    if (state !== null && state.mode === 'edit') {
      // console.log(`clearInterval(${timer.id});`)
      // clearInterval(timer.id);
      // debugger;
      // setState({...state, interval: timer.id})
    }

  }, [state, timer])
  
  // useEffect(() => {
  //   const updateDefaultData = (defaultData) => {

  //     // let updatedDefault = [...defaultData];
  //     defaultData.forEach(async (d, i) => {
  //       const code = d.currentcy;
  //       const result = await new API().getRatesToUSD(code);
  //       console.log(result);
        
  //         d.priceCypto = result;
  //         d.amountUSD = d.priceCypto * d.amountCypto;
  //         // updatedData.push(d);
  //         defaultData.splice(i, 1, d);
        
        
  //     });
  //     console.log('defaultData', defaultData);
  //     return defaultData;
  //   }

  //   let defaultData = new API().defaultData;
  //   const updatedData = updateDefaultData(defaultData);

  //   if (state === null) {
  //     console.log('defaultData', defaultData);
  //     debugger;
  //     setState({model: updatedData, isPending: true})
  //   } else if (state.isPending === true) {
  //     console.log('updatedData', updatedData);
  //     debugger;
  //     setState({...state, mode: 'read', interval: null})
  //   }

  //   // debugger;
  //   // console.log(updatedDefault);
  //   // console.log(state);
  //   // console.log(timer)
  //   // if (state !== null) {
  //   //   console.log(defaultData === state.model)
  //   //   debugger;
  //   // }
  //   // debugger;

  //   // if (state.mode === 'edit') {
  //   //   debugger
  //   //   clearInterval(timer.id);
  //   //   setState({...state, interval: null});
  //   // } else {
  //   //   debugger;
  //   //   setState({mode: 'read', isPending: false, model: defaultData, interval: timer.id});
  //   // }

    
    
  
  // }, [state]);

  // useEffect(() => {
  //   if (state === null) {
  //     const defaultData = new API().defaultData;
  //     // setState({model: defaultData, isPending: true, interval: timer.id})
  //   }
  // },[state])

  useEffect(() => {
    // console.log('ratesData', ratesData)
    // console.log('rates', rates)
    // debugger;
    if (rates === null) {
      debugger;
      setRates(ratesData.data);
    }
  }, [rates, ratesData]);

  // useEffect(() => {
  //   // console.log(data);
  //   // debugger;
  //   if (state !== null) {
  //       // const api = new API();
  //       // const defaultData = api.defaultData;

  //       // const updatedData = updateDefaultData(defaultData);
  //       // console.log(updatedData);
  //       // debugger
        
  //       // setState({...state, isPending: false});
  //       if (state !== null && 'interval' in state) {
  //         if (state.mode === 'edit') {
  //           debugger
  //           clearInterval(timer.id);
  //           setState({...state, interval: timer.id});
  //         } else {
  //           // updateDefaultData(state.model);
  //           // setState({...state, interval: data.intervalRef.current});
  //         }
  //       } else {
  //         // updateDefaultData(defaultData);
  //         // setState({mode: 'read', isPending: false, model: defaultData, interval: data.intervalRef.current});
  //       }
  //   }
  // }, [state, timer]);

  // useEffect(() => {
    
  //   if (state !== null) {
  //     console.log(state)
  //     console.log(data.intervalRef.current, state.interval)

  //     if ('mode' in state && state.mode === 'edit' && data.intervalRef.current === state.interval) {
  //       console.log('in edit mode, clear the interval')
  //       clearInterval(data.intervalRef.current);
  //     } else {
  //       console.log(data.intervalRef, state.interval)
  //       console.log('in read mode, restart the interval');
  //       console.log(state.interval);
  //       if (state.mode === "read" && state.interval === 0) {
  //         data.refetch()
  //       }
  //     }
  //   }
    
  // }, [state, data]);

  return (
    <div className="App">
      <header className="App-header">
        BitPay Invoice Generator
      </header>
      {((state !== null && state.isPending === false) && rates !== null) ? 
        <AppContext.Provider value={{state, setState, rates}}>
          {state.interval}
          <form className="table-form">
            <Table />
          </form>
        </AppContext.Provider>
        :
        'Getting Current Rates...' 
      }
    </div>
  );
}

export default App;