import React, { useEffect, useState } from 'react'
import TableData from './TableData'
import { useAppContext } from '../../App';
import API from '../../api/api';
import NumbersFormat from '../../utils/numberFormat';
import useRateToUSD from '../../useRateToUSD';

const FormField = ({field, type, index}) => {

  const context = useAppContext();
  const {state, rates} = context;

  const [blur, setBlur] = useState(null)
  const [change, setChange] = useState(null)

  const currencyToUSD = useRateToUSD(state.model[state.index].currentcy);
  
  useEffect(() => {
    if (blur !== null) {
      setChange((v) => {
        return {type: blur.event.target.type, value: blur.event.target.value, name: blur.event.target.name, id: blur.event.target.id, event: blur.event}
      })
      console.log('blur======', blur)
      console.log('event======', blur.event)
    }
  }, [blur])

  useEffect(() => {
    if (change !== null) {

      // console.log(change);
      // debugger;

      // console.log('handleChange-------------',change.event);
      console.log('change.event.target.name-------------',change.event.target.name);
      console.log('change.event.target.value-------------',change.event.data);
      
      switch(change.name) {
        case 'amountCypto':
          let decimalLen = 0;
          const countDecimals = new NumbersFormat().countDecimals;
          const isValidNumber = new NumbersFormat().isValidNumber;
          if (isValidNumber(change.value) || change.value === "") {
            if (change.value !== "") {
              decimalLen = countDecimals(parseFloat(change.value));
            }
            if ((change.value.length <= 8 && decimalLen === 0) || (decimalLen <= 8 && decimalLen !== 0) || (decimalLen === 8 && change.value.slice(-1) !== "0")) {
              [...state.model][state.index][change.id] = change.value;
            } 
          }
          break;
        default:
          [...state.model][state.index][change.id] = change.value;
          break;
      }


      console.log(`change.name && event.type::::`, change.type, change.event.type);

      if (change.name === 'currentcy' && change.event.type === 'blur') {
        const rate = currencyToUSD.dataRateToUSD.data.rate;
        state.model[state.index].priceCypto = rate;
        state.model[state.index].amountUSD = rate * parseFloat(state.model[state.index].amountCypto)
      }

      console.log(`state.model:::::::::`, state.model);
      debugger;

      context.setState({...state, model: state.model});
    }
  }, [change])

  const handleBlur = (e) => {
    console.log('blur======', blur)
    
    setBlur((v) => {
      return {value: e.target.value, name: e.target.name, id: e.target.id, event: e}
    })
  };
  
  const handleChange = (event) => {
    setChange((v) => {
      return {type: event.target.type, value: event.target.value, name: event.target.name, id: event.target.id, event: event}
    })
  }

  switch(type) {
    case 'text':
      return (
        <input
            type="text"
            value={state.model[index][field]}
            id={field}
            name={field}
            onChange={handleChange}
            onBlur={(e) => {
              if (field !== 'amountCypto') return;
              handleBlur(e)
            }}
        />
      )
    case 'select':
      return (
        <select
          value={state.model[index][field]}
          id={field}
          name={field}
          onChange={(e) => handleChange(e, index)}
          onBlur={(e) => handleBlur(e)}>
            <option value="0"></option>
            {
            rates.map(r => <option key={r.code} value={r.code}>{r.code}</option>)
            }
        </select>
      )
    default:
      return null;
  }
};


const TableDataInput = ({field, type, index}) => {
  
  const context = useAppContext();
  const { state } = context;

  return (
    <TableData>
      
      {(state.mode === 'read' || state.index !== index) ?
          state.model[index][field]
      :
          <p>
              <label>{field[0].toUpperCase()}</label>
              <FormField
                field={field}
                type={type}
                index={index}
              />
          </p>
      }
      
    </TableData>
  )
}

export default TableDataInput;