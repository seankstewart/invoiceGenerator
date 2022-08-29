import React, { useContext } from 'react'
import TableData from './TableData'
import { AppContext } from '../../App';

const TableDataCurrency = ({index, handleBlur, handleChange, rates}) => {

  const context = useContext(AppContext);

  return (
    <TableData>
        
      {(context.state.mode === 'read' || context.state.index !== index) ?
          context.state.model[index].currentcy
      :
          <p>
          <label htmlFor="currency">Currency</label>
          <select value={context.state.model[index].currentcy} id="currentcy" name="currency" tabIndex="0" onChange={(e) => handleChange(e, index)} onBlur={(e) => handleBlur(e)}>
              <option value="0"></option>
              {
              rates.map(r => <option key={r.code} value={r.code}>{r.code}</option>)
              }
          </select>
          </p>
      }
        
    </TableData>
  )
}   
export default TableDataCurrency;