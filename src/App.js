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

  useTimer(() => updateData(null).then((res) => {
    setState({...state, isPending: false, model: res, message: 'Rates have been updated'})
  }), (state !== null && state.mode === 'edit') ? null : 120000);

  const updateData = useCallback( async (data) => {
    /* updateData was called by setInterval */
    if (data === null) {
      return await Promise.all(state.model.map(async (d) => {
        const code = d.currentcy;
        const ratesUSD = await new API(state, setState).getRatesToUSD(code);
        d.priceCypto = ratesUSD;
        d.amountUSD = d.priceCypto * d.amountCypto;
        setState({...state, message: ""});
        return d;
      }));
    }

    /* updateData was called by useEffect */
    return await Promise.all(data.map(async (d) => {
      const code = d.currentcy;
      const ratesUSD = await new API(state, setState).getRatesToUSD(code);
      d.priceCypto = ratesUSD;
      d.amountUSD = d.priceCypto * d.amountCypto;
      setState({...state, message: ""});
      return d;
    }));
  },[state])

  useEffect(() => {
    let data = null;
    if (state === null) {
      data = new API().defaultData;
      window.setTimeout(() => updateData(data).then((res) => {
        setState({mode: 'read', model: res, isPending: false, message: ""})
      }), 3000);
    }
  }, [state, updateData])

  useEffect(() => {
    if (rates === null) {
      setRates(ratesData.data);
    }
  }, [rates, ratesData]);

  return (
    <div className="App">
      <header className="App-header">
        BitPay Invoice Generator
      </header>
      {((state !== null && state.isPending === false) && rates !== null) ? 
        <AppContext.Provider value={{state, setState, rates}}>

          <div className={'message'}>{(state.message !== "") ? <span className={'hideMeAfter5Seconds'}>{state.message}</span> : null}</div>
          <form className="table-form">
            <Table />
          </form>
        </AppContext.Provider>
        :
        <div className={'message'}>Fetching Rates...</div>
      }
    </div>
  );
}

export default App;