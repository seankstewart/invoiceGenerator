import React, { createContext, useContext, useEffect, useState } from 'react'
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

  useEffect(() => {
    
    if (data.loading === false) {
      setRates(data.data);
    }
  }, [data, rates]);

  useEffect(() => {
    if (data.data !== null) {
        const api = new API();
        const defaultData = api.defaultData;
        if (state !== null && 'interval' in state) {
          if (state.mode === 'edit') {
            setState({...state, interval: 0});
          } else {
            setState({...state, interval: data.intervalRef.current});
          }
        } else {
          setState({mode: 'read', isPending: false, model: defaultData, interval: data.intervalRef.current});
        }
    }
  }, [data.data, data.intervalRef]);

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
          clearInterval(data.intervalRef.current);
          // data.startInterval(5000);
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
      {(state === null) ? 'Getting Current Rates...' 
        : 
        <AppContext.Provider value={{state, setState, rates}}>
          <form className="table-form">
            <Table />
          </form>
        </AppContext.Provider>
      }
    </div>
  );
}

export default App;