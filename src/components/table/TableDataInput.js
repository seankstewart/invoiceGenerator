import React from 'react'
import TableData from './TableData'
import { useAppContext } from '../../App';
import API from '../../api/api';
import NumbersFormat from '../../utils/numberFormat';


const FormField = ({field, type, index}) => {

  const context = useAppContext();
  const {state, rates} = context;

  const handleBlur = (e) => {

    console.log('handleBlur');
    console.log(e);

    let rateToUSD = async () => await new API().getRatesToUSD(state.model[state.index].currentcy).then((res) => {
      state.model[state.index].priceCypto = res;
      state.model[state.index].amountUSD = res * parseFloat(state.model[state.index].amountCypto)
      handleChange(e);
    });
  
    if (state.model[state.index].amountCypto !== '' && state.model[state.index].currentcy !== "") {
      rateToUSD();
    }
  };
  
  const handleChange = (event) => {
    
    switch(event.target.name) {
      case 'amountCypto':
        let decimalLen = 0;
        const countDecimals = new NumbersFormat().countDecimals;
        const isValidNumber = new NumbersFormat().isValidNumber;
        if (isValidNumber(event.target.value) || event.target.value === "") {
          if (event.target.value !== "") {
            decimalLen = countDecimals(parseFloat(event.target.value));
          }
          if ((event.target.value.length <= 8 && decimalLen === 0) || (decimalLen <= 8 && decimalLen !== 0) || (decimalLen === 8 && event.target.value.slice(-1) !== "0")) {
            [...state.model][state.index][event.target.id] = event.target.value;
          } 
        }
        break;
      default:
        [...state.model][state.index][event.target.id] = event.target.value;
        break;
    }

    context.setState({...state, model: state.model});
    
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
  debugger;
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