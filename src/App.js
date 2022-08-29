import React, { createContext, useEffect, useState } from 'react'
import API from './api/api';
import './App.scss';
import Table from './components/tables/Table';
import NumbersFormat from './utils/numberFormat';




async function sleep(fn, par) {
  return await setTimeout(async function() {
    await fn(par);
  }, 1000, fn, par);
}

export const AppContext = createContext();

const App = () => {

  const api = new API();
  const getRatesToUSD = api.getRatesToUSD;
  const defaultData = new API().defaultData;

  const [state, setState] = useState({
    mode: 'read',
    isPending: true,
    model: defaultData
  });
  const [rates, setRates] = useState([]);

  
  useEffect(() => {
    const getAppData = async () => {
      await api.getRates(state, setState, setRates);
      debugger;
      await sleep(() => setState({...state, isPending: false}));
    }
    getAppData();
  }, []);


  
  const handleBlur = (e) => {

    console.log('handleBlur EVNT');
    console.log(e);

    // if (e.type === 'blur') {
      let rateToUSD = async () => await getRatesToUSD(state.model[state.index].currentcy).then((res) => {
        state.model[state.index].priceCypto = res;
        state.model[state.index].amountUSD = res * parseFloat(state.model[state.index].amountCypto)
        handleChange(e);
        // setState({...state, mode: 'edit', index: state.index})
      });
    
      if (state.model[state.index].amountCypto !== '' && state.model[state.index].currentcy !== "") {
        rateToUSD();
      }
      
      // setState({...state, mode: 'edit', index: index})
    // }

    
    
  };
  
  const handleCheckbox = (e, index) => {
    if (e.target.checked === true) {
      setState({...state, mode: 'edit', index: index})
    } else {
      setState({...state, mode: 'read'})
    }
  };

  const handleChange = (event) => {
    
    switch(event.target.name) {
      case 'amountCypto':
        let decimalLen = 0;
        const countDecimals = new NumbersFormat().countDecimals;
        if (new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$").test(event.target.value) || decimalLen <= 8) {
          if (event.target.value.length > 0) {
            decimalLen = countDecimals(parseFloat(event.target.value));
          }
          [...state.model][state.index][event.target.id] = event.target.value;
        }
        break;
      default:
        [...state.model][state.index][event.target.id] = event.target.value;
        break;
    }

    setState({...state, model: state.model});
    
  }


  return (
    <div className="App">
      <header className="App-header">
        BitPay
      </header>
      {(state.isPending === true) ? 'Getting Current Rates...' 
        : 
        <AppContext.Provider value={{state, setState}}>
          <form className="table-form">
            <Table handleBlur={handleBlur} handleChange={handleChange} handleCheckbox={handleCheckbox} rates={rates} />
          </form>
        </AppContext.Provider>
      }
    </div>
  );
}

export default App;