import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import API from './api/api';
import './App.scss';
import Table from './components/table/Table';
import useFetch from './useFetch';

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
}

const App = () => {

  const [state, setState] = useState(null);
  const [rates, setRates] = useState(null);

  const data = useFetch('https://bitpay.com/api/rates', true);
  
  const updateDefaultData = useCallback((defaultData) => {
    const updatedData = [];
    defaultData.forEach(async (d) => {
      const code = d.currentcy;
      const result = await new API().getRatesToUSD(code);
      console.log(result);
      // .then((res) => {
        d.priceCypto = result;
        d.amountUSD = d.priceCypto * d.amountCypto;
        updatedData.push(d);
      // });

      console.log(updatedData);

      // data.refetch()
      setState({mode: 'read', isPending: false, model: updatedData, interval: data.intervalRef.current});
      
    });
    return updatedData;
    
  },[data])

  useEffect(() => {
    
    // if (state === null) {
      console.log(data.data)
      debugger;
      setRates(data.data);
    // }
  }, [data, rates]);

  useEffect(() => {
    // console.log(data);
    // debugger;
    if (state === null) {
        const api = new API();
        const defaultData = api.defaultData;

        const updatedData = updateDefaultData(defaultData);
        console.log(updatedData);
        debugger
        
        // setState({...state, isPending: false});
        // if (state !== null && 'interval' in state) {
        //   if (state.mode === 'edit') {
        //     setState({...state, interval: 0});
        //   } else {
        //     updateDefaultData(state.model);
        //     setState({...state, interval: data.intervalRef.current});
        //   }
        // } else {
        //   updateDefaultData(defaultData);
        //   setState({mode: 'read', isPending: false, model: defaultData, interval: data.intervalRef.current});
        // }
    }
  }, [state, updateDefaultData]);

  useEffect(() => {
    
    if (state !== null) {
      console.log(state)
      console.log(data.intervalRef.current, state.interval)

      if ('mode' in state && state.mode === 'edit' && data.intervalRef.current === state.interval) {
        console.log('in edit mode, clear the interval')
        clearInterval(data.intervalRef.current);
      } else {
        console.log(data.intervalRef, state.interval)
        console.log('in read mode, restart the interval');
        console.log(state.interval);
        if (state.mode === "read" && state.interval === 0) {
          data.refetch()
        }
      }
    }
    
  }, [state, data]);

  return (
    <div className="App">
      <header className="App-header">
        BitPay Invoice Generator
      </header>
      {(state !== null && state.isPending === false) ? 
        <AppContext.Provider value={{state, setState, rates}}>
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