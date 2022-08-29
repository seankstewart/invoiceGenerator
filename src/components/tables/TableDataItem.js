import React, { useContext } from 'react'
import TableData from './TableData'
import { AppContext } from '../../App';

const TableDataItem = ({index, handleChange}) => {

    const context = useContext(AppContext);
  return (
    <TableData>
        
        {(context.state.mode === 'read' || context.state.index !== index) ?
            context.state.model[index].item
        :
            <p>
            <label htmlFor="item">Item</label>
            <input type="text" value={context.state.model[index].item} id="item" name="item" tabIndex="0" onChange={handleChange} />
            </p>
        }
        
    </TableData>
  )
}

export default TableDataItem;