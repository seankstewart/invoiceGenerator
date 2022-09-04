import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import API from './api/api';
import './App.scss';
import Table from './components/table/Table';
import useFetch from './useFetch';
import useTimer from './useTimer';
import Message from './components/Message';
import ErrorBoundary from './ErrorBoundary';

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
}

const App = () => {

  const [state, setState] = useState(null);
  const [rates, setRates] = useState(null);
  const [showTableFormClass, setShowTableFormClass] = useState('');

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

  useEffect(() => {
    if ((state !== null && state.isPending === false) && rates !== null) {
      setShowTableFormClass('show');
    }
  }, [state, rates, showTableFormClass])

  return (
    <div className="App">
      <header className="App-header">
        <span className={`${showTableFormClass}`} style={(showTableFormClass !== '') ? {transform: 'translateY(-2.5vh)'} : null}>BitPay Invoice Generator</span>
      </header>
      {((state !== null && state.isPending === false) && rates !== null) ? 
        <AppContext.Provider value={{state, setState, rates}}>
          <ErrorBoundary>
            <div className={`table-form ${showTableFormClass}`}>
              <form>
                <Table />
              </form>
              <Message />
            </div>
          </ErrorBoundary>
        </AppContext.Provider>
        :
        <div className={'message'}>Fetching Rates...</div>
      }
    </div>
  );
}

export default App;