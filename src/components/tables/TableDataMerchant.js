import React, { useContext } from 'react'
import TableData from './TableData'
import { AppContext } from '../../App';

const TableDataMerchant = ({index, handleChange}) => {

    const context = useContext(AppContext);
  return (
    <TableData>
        
        {(context.state.mode === 'read' || context.state.index !== index) ?
            context.state.model[index].merchant
        :
            <p>
            <label htmlFor="merchant">Merchant</label>
            <input type="text" value={context.state.model[index].merchant} id="merchant" name="merchant" tabIndex="0" onChange={handleChange} />
            </p>
        }
        
    </TableData>
  )
}

export default TableDataMerchant;