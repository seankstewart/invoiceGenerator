import React, { useCallback, useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';


const defaultData = [
  {
    merchant: 'ShirtTown',
    item: 'T-shirts',
    amountCypto: 1.43219876,
    currentcy: 'BTC',
    priceCypto: 9285.93,
    amountUSD: 13299.30
  },
  {
    merchant: 'CrazyCups',
    item: 'Cups',
    amountCypto: 2.76236751,
    currentcy: 'BCH',
    priceCypto: 6483.69,
    amountUSD: 17910.33
  },
  {
    merchant: 'GimmeGold',
    item: 'Gold bullion',
    amountCypto: 10.78654328,
    currentcy: 'ETH',
    priceCypto: 442.08,
    amountUSD: 4768.52
  }
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
  return `$${parseFloat(value).toFixed(2)}`;
}

const formatCrypto = (value) => {
  return parseFloat(value).toFixed(8);
}


const AddButton = ({handleAdd}) => {
  return (
    <div><button onClick={handleAdd}>Add</button></div>
  )
}


// const useInterval = () => {
//   const [updated, setUpdated] = useState(true);

//   // useEffect(() => {
//     const interval = useCallback(setInterval(() => {
//       console.log(updated)
//       setUpdated(u => !u);
//       console.log('This will be called every 2 minutes');
//     }, 5000),[])
    
//     console.log([updated, interval])

//     return [updated, interval]
//     // }, 5000);

//     // return () => clearInterval(interval);
    
//   // }, [updated]);
// }

const Table = ({rates, isUpdated, handleEdit, handleDelete}) => {

  // const [isUpdated, intervalIsOn] = useInterval();
  

  const styles = {
    margin:'auto'
  }  

  return (
    <>
      <div>Updated: {(isUpdated === true) ? 'true' : 'false'}</div>
      <table cellPadding="0" cellSpacing="0" border="1" style={(isUpdated === false) ? {...styles, backgroundColor: 'red'} : {...styles, backgroundColor: 'pink'}}>
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Item</th>
            <th>Amount (Crypto)</th>
            <th>Currency</th>
            <th>Price/crypto (USD)</th>
            <th>Amount (USD)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {defaultData.map((data, index) => {
            return (
              <tr key={`tableRow${index}`}>
                <td>{data.merchant}</td>
                <td>{data.item}</td>
                <td>{formatCrypto(data.amountCypto)}</td>
                <td>{data.currentcy}</td>
                <td>{formatUSD(data.priceCypto)}</td>
                <td>{formatUSD(data.amountUSD)}</td>
                <td>
                  <button onClick={(e) => handleEdit(index)}>Edit</button>
                  <button onClick={(e) => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}


async function sleep(fn, par) {
  return await setTimeout(async function() {
    await fn(par);
  }, 1000, fn, par);
}



function App() {
  console.log('loading App')

  const [isPending, setIsPending] = useState(true);
  const [rates, setRates] = useState([]);
  const [updated, setUpdated] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);

  let interval = null;

  const getRates = async () => {
    setIsPending(true);
    // await fetch('https://bitpay.com/api/rates')
    await fetch('./rates.json')
      .then(response => response.json())
      .then(json => {
          console.log(json);
          setRates(json);
          setUpdated(u => !u);
          setIsPending(false);
      })
      .catch(e => {
          console.log(e)
      })
  }

  useEffect(() => {

    const getAppData = async () => {
      await getRates();
      await sleep(() => setIsPending(false));
    }

    getAppData();
  
  }, []);

  useEffect(() => {
    if (displayForm === false) {
      interval = setInterval(getRates, 5000);
    }

    return () => clearInterval(interval);
  }, [updated, displayForm])

  const renderForm = (values) => {
    console.log('render the form to add and/or edit table items');
    setDisplayForm(true);
  }

  const handleEdit = useCallback((index) => {
    clearInterval(interval);
    console.log(`edit item at index: ${index}`);
    
    setDisplayForm({
      index: index,
      valueMerchant: defaultData[index].merchant,
      valueItem: defaultData[index].item,
      valueAmountCypto: defaultData[index].amountCypto,
      valueCurrency: defaultData[index].currentcy,
      // valuePriceUSD: defaultData[index].priceCypto,
      // amountUSD: 3
    });
    // setUpdated(u => !u);
  },[])

  const handleAdd = useCallback(() => {
    clearInterval(interval);
    console.log('add item');
    renderForm({});
    setUpdated(u => !u);
  },[])

  const handleDelete = useCallback((index) => {
    console.log(`delete item at index: ${index}`);
    defaultData.splice(index, 1);
    setUpdated(u => !u);
  },[])

  return (
    <div className="App">
      <header className="App-header">
        BitPay
      </header>
      {(isPending === true) ? 'Getting Current Rates...' 
        : 
        <>
          <Table isUpdated={updated} handleEdit={handleEdit} handleDelete={handleDelete} />
          <AddButton handleAdd={handleAdd} />
          <Form setDisplayForm={setDisplayForm} displayForm={displayForm} setUpdated={setUpdated} handleEdit={handleEdit} />
          <Rates rates={rates} isUpdated={updated} />
        </>
      }
      {/* {(isPending === true) ? 'Getting Current Rates...' : <><Table isUpdated={updated} /></>} */}
    </div>
  );
}


const Rates = ({rates, isUpdated}) => {
  return (
    <>
      Number of Rates in response: {rates.length}
      <table>
        <tbody>
          {rates.map((rate, i) => {
            return (
              <tr key={`rate.code${i}`}>
                <td>{rate.code}</td>
                <td>{parseFloat(rate.rate).toFixed(8)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}



const Form = ({setDisplayForm, displayForm, setUpdated}) => {

  const emptyValues = {index: '', valueMerchant: '', valueItem: '', valueCurrency: "0", valueAmountCypto: ''};
  const [formState, setFormState] = useState(emptyValues);

  useEffect(() => {
    if (typeof displayForm !== "boolean") {
      setFormState(displayForm);
    }
  }, [displayForm, setUpdated])

  const handleChange = async (event) => {
    console.log(event.target);
    switch(event.target.name) {
      case 'merchant':
        setFormState({...formState, valueMerchant: event.target.value});
        break;
      case 'item':
        setFormState({...formState, valueItem: event.target.value});
        break;
      case 'currency':
        setFormState({...formState, valueCurrency: event.target.value});
        break;
      case 'amountCypto':
        setFormState({...formState, valueAmountCypto: event.target.value});
        break;
      default:
        setFormState({...formState})   
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handle form submit');
    console.log(formState);
    
    const rateToUSD = await getRatesToUSD(formState.valueCurrency);
    
    const formValues = {
      merchant: formState.valueMerchant,
      item: formState.valueItem,
      amountCypto: formState.valueAmountCypto,
      currentcy: formState.valueCurrency,
      priceCypto: rateToUSD,
      amountUSD: rateToUSD * parseFloat(formState.valueAmountCypto)
    }

    if (rateToUSD) {
      if (typeof displayForm !== "boolean") {
        defaultData.splice(formState.index, 1, formValues);
      } else {
        defaultData.push(formValues);
      }
      setFormState(emptyValues);
      setDisplayForm(false);
    }
  }


  if (displayForm !== false) {
    return (
      <div>
        <form onSubmit={handleSubmit}> 
          <p style={{visibility:'hidden'}}>
            <label htmlFor="index">Index</label>
            <input type="hidden" value={formState.index} id="index" name="index" tabIndex="-1" />
          </p>
          <p>
            <label htmlFor="merchant">Merchant</label>
            <input type="text" value={formState.valueMerchant} id="merchant" name="merchant" tabIndex="0" onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="item">Item</label>
            <input type="text" value={formState.valueItem} id="item" name="item" tabIndex="0" onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="amountCypto">Amount (Cypto)</label>
            <input type="text" value={formState.valueAmountCypto} id="amountCypto" name="amountCypto" tabIndex="0" onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="currency">Currency</label>
            <select value={formState.valueCurrency} id="currency" name="currency" tabIndex="0" onChange={handleChange}>
              <option value="0"></option>
              <option value="BTC">BTC</option>
              <option value="BCH">BCH</option>
              <option value="ETH">ETH</option>
              {/* <option value="USD">USD</option> */}
            </select>
          </p>
          <p><input type="submit" value="Submit" tabIndex="0" /></p>
        </form>
      </div>
    )
    } else {
      return null;
    }
}

export default App;
