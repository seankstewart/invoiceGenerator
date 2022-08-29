import React, { useContext } from 'react'
import TableData from './TableData'
import { AppContext } from '../../App';
import NumbersFormat from '../../utils/numberFormat';

const TableDataAmountCrypto = ({index, handleChange, handleCheckbox}) => {

  const context = useContext(AppContext);
  const formatCrypto = new NumbersFormat().formatCrypto;

  return (
    <TableData>
        
        {(context.state.mode === 'read' || context.state.index !== index) ?
            formatCrypto(context.state.model[index].amountCypto)
        :
            <p>
            <label htmlFor="amountCypto">Amount (Cypto)</label>
            <input type="text" value={context.state.model[index].amountCypto} id="amountCypto" name="amountCypto" tabIndex="0" onChange={(e) => handleChange(e)} onBlur={(e) => handleCheckbox(e, index)} />
            </p>
        }
        
    </TableData>
  )
}

export default TableDataAmountCrypto;