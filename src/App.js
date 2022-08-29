import React, { createContext, useEffect, useState } from 'react'
import './reset.css';
import './App.css';
import './App.scss';

import EditButton from './components/EditButton';
import DeleteButton from './components/DeleteButton';
import AddButton from './components/AddButton';


const defaultData = [
  // {
  //   merchant: 'ShirtTown',
  //   item: 'T-shirts',
  //   amountCypto: 1.43219876,
  //   currentcy: 'BTC',
  //   priceCypto: 9285.93,
  //   amountUSD: 13299.30
  // },
  // {
  //   merchant: 'CrazyCups',
  //   item: 'Cups',
  //   amountCypto: 2.76236751,
  //   currentcy: 'BCH',
  //   priceCypto: 6483.69,
  //   amountUSD: 17910.33
  // },
  // {
  //   merchant: 'GimmeGold',
  //   item: 'Gold bullion',
  //   amountCypto: 10.78654328,
  //   currentcy: 'ETH',
  //   priceCypto: 442.08,
  //   amountUSD: 4768.52
  // }
]


const getRatesToUSD = async (currencyType) => {
  let rate = 0;
  await fetch(`https://bitpay.com/api/rates/${currencyType}/USD`)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        rate = json.rate;
    })
    .catch(e => {
        console.log(e)
    });

  return rate;
}

const formatUSD = (value) => {

  if (isNaN(parseFloat(value))) {
    value = 0;
  }

  return `$${parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const formatCrypto = (value) => {
  if (isNaN(parseFloat(value))) {
    return
  }
  return parseFloat(value).toFixed(8);
}

Number.prototype.countDecimals = function() {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0; 
}

async function sleep(fn, par) {
  return await setTimeout(async function() {
    await fn(par);
  }, 1000, fn, par);
}

export const AppContext = createContext();

function App() {
  console.log('loading App')


  const [state, setState] = useState({
    mode: 'read',
    isPending: true,
    model: defaultData
  });

  
  const [rates, setRates] = useState([]);
  const [updated, setUpdated] = useState(true);

  let interval = null;

  const getRates = async () => {
    // setIsPending(true);
    // await fetch('https://bitpay.com/api/rates')
    await fetch('./rates.json')
      .then(response => response.json())
      .then(json => {
          setRates(json);
          // setUpdated(u => !u);
          // setIsPending(false);
          setState({...state, isPending: false})
      })
      .catch(e => {
          console.log(e)
      })
  }

  useEffect(() => {

    const getAppData = async () => {
      await getRates();
      await sleep(() => setState({...state, isPending: false}));
    }

    getAppData();
  
  }, []);

  


  const handleCheckbox = (e, index) => {

    console.log(e);

    if (e.target.checked === true || e.type === 'blur') {
      let rateToUSD = async () => await getRatesToUSD(state.model[state.index].currentcy).then((res) => {
        state.model[state.index].priceCypto = res;
        state.model[state.index].amountUSD = res * parseFloat(state.model[state.index].amountCypto)
        setState({...state, mode: 'edit', index: (e.type === 'blur') ? state.index : index})
      });
    
      rateToUSD();
      setState({...state, mode: 'edit', index: (e.type === 'blur') ? state.index : index})
    } else {
      setState({...state, mode: 'read'})
    }
  };

  const handleChange = (event) => {
    console.log(event.target);
    // console.log(parseFloat(event.target.value).slice(event.target.value.indexOf('.')*-1))
    
    switch(event.target.name) {
      case 'amountCypto':
        console.log('amountCypto hasChnaged');
        console.log(new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$").test(event.target.value))
        console.log(parseFloat(event.target.value).countDecimals())
        debugger;
        if (new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$").test(event.target.value) && parseFloat(event.target.value).countDecimals() <= 10) {
          [...state.model][state.index][event.target.id] = event.target.value;
        }
        break;
      default:
        [...state.model][state.index][event.target.id] = event.target.value;
    }

    setState({...state, index: state.index});
    
  }

  return (
    <div className="App">
      <header className="App-header">
        BitPay
      </header>
      {(state.isPending === true) ? 'Getting Current Rates...' 
        : 
        <AppContext.Provider value={{state, setState, getRatesToUSD}}>
          {/* <Form rates={rates} setDisplayForm={setDisplayForm} displayForm={displayForm} setUpdated={setUpdated} handleEdit={handleEdit}>
            <Table rates={rates} displayForm={displayForm} isUpdated={updated} handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete} />
          </Form> */}



          <form className="table-form"> 
          
            <table cellPadding="0" cellSpacing="0" border="1">
              <thead>
                <tr>
                  <th className={`td-actions`}><input type="checkbox" disabled="disabled" /></th>
                  <th className={`td-merchant`}>Merchant</th>
                  <th className={`td-item`}>Item</th>
                  <th className={`td-amountCrypto`}>Amount (Crypto)</th>
                  <th className={`td-currency`}>Currency</th>
                  <th className={`td-price-USD`}>Price/crypto (USD)</th>
                  <th className={`td-amount-USD`}>Amount (USD)</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {state.model.map((data, index) => {
                  return (
                    <tr key={`tableRow${index}`}>
                      <td>
                        <input type="checkbox" checked={(state.mode === 'read' || state.index !== index) ? false : true} onChange={(event) => handleCheckbox(event, index)} />
                      </td>
                      <td>
                        {(state.mode === 'read' || state.index !== index) ?
                          data.merchant
                        :
                          <p>
                            <label htmlFor="merchant">Merchant</label>
                            <input type="text" value={data.merchant} id="merchant" name="merchant" tabIndex="0" onChange={handleChange} />
                          </p>
                        }
                      </td>
                      <td>
                        {(state.mode === 'read' || state.index !== index) ?
                          data.item
                        :
                          <p>
                            <label htmlFor="item">Item</label>
                            <input type="text" value={data.item} id="item" name="item" tabIndex="0" onChange={handleChange} />
                          </p>
                        }
                      </td>
                      <td>
                        {(state.mode === 'read' || state.index !== index) ?
                          formatCrypto(data.amountCypto)
                        :
                          <p>
                            <label htmlFor="amountCypto">Amount (Cypto)</label>
                            <input type="text" value={data.amountCypto} id="amountCypto" name="amountCypto" tabIndex="0" onChange={handleChange} onBlur={handleCheckbox} />
                          </p>
                        }
                      </td>
                      <td>
                        {(state.mode === 'read' || state.index !== index) ?
                          data.currentcy
                        :
                          <p>
                            <label htmlFor="currency">Currency</label>
                            <select value={data.currentcy} id="currentcy" name="currency" tabIndex="0" onChange={handleChange} onBlur={handleCheckbox}>
                              <option value="0"></option>
                              {
                                rates.map(r => <option key={r.code} value={r.code}>{r.code}</option>)
                              }
                            </select>
                          </p>
                        }
                      </td>
                      <td>
                        {formatUSD(data.priceCypto)}
                      </td>
                      <td>{formatUSD(data.amountUSD)}</td>
                      {/* <td>
                        <button onClick={(e) => handleEdit(index)}>Edit</button>
                        <button onClick={(e) => handleDelete(index)}>Delete</button>
                      </td> */}
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" align="left">
                    <AddButton>Add</AddButton>
                    <EditButton>Save</EditButton>
                    <DeleteButton>Delete</DeleteButton>
                    {/* <Button task={(e) => handleEdit(displayForm.index)} label="Edit" />
                    <Button task={(e) => handleDelete(displayForm.index)} label="Delete" /> */}
                    {/* <button onClick={(e) => handleEdit(0)}>Edit</button>
                    <button onClick={(e) => handleDelete(0)}>Delete</button> */}
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>



          {/* <Table rates={rates} displayForm={displayForm} isUpdated={updated} handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete} />
          <Form rates={rates} setDisplayForm={setDisplayForm} displayForm={displayForm} setUpdated={setUpdated} handleEdit={handleEdit} /> */}
          {/* <Rates rates={rates} isUpdated={updated} /> */}
        </AppContext.Provider>
      }
      {/* {(isPending === true) ? 'Getting Current Rates...' : <><Table isUpdated={updated} /></>} */}
    </div>
  );
}

export default App;
