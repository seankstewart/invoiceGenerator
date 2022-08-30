import React, { createContext, useContext, useEffect, useState } from 'react'
import API from './api/api';
import './App.scss';
import Table from './components/table/Table';
import useFetch from './useFetch';

async function sleep(fn, par) {
  return await setTimeout(async function() {
    await fn(par);
  }, 10000, fn, par);
}

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  
  return context;
}

const App = () => {

  const api = new API();
  const defaultData = new API().defaultData;

  const [state, setState] = useState({
    mode: 'read',
    isPending: true,
    model: defaultData
  });
  const [rates, setRates] = useState([]);

  const data = useFetch('https://bitpay.com/api/rates');

  useEffect(() => {
    if (data.loading === false) {
      setRates(data.data);
      console.log(data.data)
      sleep(setState({...state, isPending: false}));
    }
  }, [state, setState, setRates]);
  
  // useEffect(() => {
  //   const getAppData = async () => {
  //     await api.getRates(state, setState, setRates);
  //     debugger;
  //     await sleep(() => setState({...state, isPending: false}));
  //   }
  //   getAppData();
  // }, []);

  // fetch new data from rates api with setInterval
  // useEffect(() => {
  //   let interval = null;
  //   const getRates = new API().getRates;
  //   if (state.mode === "read") {
  //     interval = setInterval(getRates, 5000);
  //   }

  //   return () => clearInterval(interval);
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        BitPay Invoice Generator
      </header>
      {(state.isPending === true) ? 'Getting Current Rates...' 
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