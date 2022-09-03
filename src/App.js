import React, { createContext, useContext, useEffect, useState } from 'react'
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
    setState({...state, isPending: false, model: res})
  }), (state !== null && state.mode === 'edit') ? null : 120000);

  const updateData = async (data) => {
    /* updateData was called by setInterval */
    if (data === null) {
      return await Promise.all(state.model.map(async (d) => {
        const code = d.currentcy;
        const ratesUSD = await new API().getRatesToUSD(code);
        d.priceCypto = ratesUSD;
        d.amountUSD = d.priceCypto * d.amountCypto;
        return d;
      }));
    }

    /* updateData was called by setInterval */
    return await Promise.all(data.map(async (d) => {
      const code = d.currentcy;
      const ratesUSD = await new API().getRatesToUSD(code);
      d.priceCypto = ratesUSD;
      d.amountUSD = d.priceCypto * d.amountCypto;
      return d;
    }));
  }

  useEffect(() => {
    let data = null;
    if (state === null) {
      data = new API().defaultData;
      updateData(data).then((res) => {
        setState({mode: 'read', model: res, isPending: false})
      });
    }
  }, [])

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