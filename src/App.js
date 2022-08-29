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


  


  const handleCheckbox = (e, index) => {

    console.log(e);

    if (e.target.checked === true || e.type === 'blur') {
      console.log(state.model[index].currentcy);
      debugger;
      let rateToUSD = async () => await getRatesToUSD(state.model[index].currentcy).then((res) => {
        state.model[index].priceCypto = res;
        state.model[index].amountUSD = res * parseFloat(state.model[index].amountCypto)
        // setState({...state, mode: 'edit', index: (e.type === 'blur') ? state.index : index})
      });
    
      rateToUSD();
      setState({...state, mode: 'edit', index: index})
    } else {
      setState({...state, mode: 'read'})
    }
  };

  const handleChange = (event) => {
    
    switch(event.target.name) {
      case 'amountCypto':
        let decimalLen = 0;
        if (event.target.value.length !== decimalLen) {
          const countDecimals = new NumbersFormat().countDecimals;
          decimalLen = countDecimals(parseFloat(event.target.value));
          if (new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$").test(event.target.value) && decimalLen <= 8) {
            [...state.model][state.index][event.target.id] = event.target.value;
          }
        } else {
          [...state.model][state.index][event.target.id] = '';
        }
        
        
        break;
      default:
        [...state.model][state.index][event.target.id] = event.target.value;
    }

    // if (event.type === 'blur') {
      let rateToUSD = async () => await getRatesToUSD(state.model[state.index].currentcy).then((res) => {
        state.model[state.index].priceCypto = res;
        state.model[state.index].amountUSD = res * parseFloat(state.model[state.index].amountCypto)
        // setState({...state, mode: 'edit', index: (e.type === 'blur') ? state.index : index})
      });
    
      rateToUSD();
    // }

    // setState({...state, model: [{...state.model[state.index], [event.target.name]: event.target.value}]})
    // setState({...state, model: state.model.splice(state.index,1,{...state.model[state.index], [event.target.name]: event.target.value})})
    setState({...state, model: state.model});
    // setState({...state, index: state.index});
    
  }
  // const handleChange = async (event) => {
  //   console.log(event.target);
  //   debugger;
  //   switch(event.target.name) {
  //     case 'merchant':
  //       setState({...state, model: [...state.model]});
  //       break;
  //     case 'item':
  //       setState({...state, model: [...state.model]});
  //       break;
  //     case 'currency':
  //       setState({...state, model: [...state.model]});
  //       break;
  //     case 'amountCypto':
  //       if (new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$").test(event.target.value) && event.target.value.length <= 10) {
  //         setState({...state, model: [...state.model]});
  //       }
  //       break;
  //     default:
  //       setState({...state})   
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
        BitPay
      </header>
      {(state.isPending === true) ? 'Getting Current Rates...' 
        : 
        <AppContext.Provider value={{state, setState}}>
          <form className="table-form">
            <Table handleChange={handleChange} handleCheckbox={handleCheckbox} rates={rates} />
          </form>
        </AppContext.Provider>
      }
    </div>
  );
}

export default App;