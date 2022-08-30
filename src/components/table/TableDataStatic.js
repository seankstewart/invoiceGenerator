import React from 'react'
import TableData from './TableData'
import NumbersFormat from '../../utils/numberFormat';
import { useAppContext } from '../../App';

const TableDataStatic = ({field, index}) => {
    
    const context = useAppContext();
    const {state} = context; 
    const formatUSD = new NumbersFormat().formatUSD;
    
  return (
    <>
        <TableData>
            {formatUSD(state.model[index][field])}
        </TableData>
    </>
  )
}   
export default TableDataStatic;