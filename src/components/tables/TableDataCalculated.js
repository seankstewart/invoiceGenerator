import React, {useContext} from 'react'
import TableData from './TableData'
import NumbersFormat from '../../utils/numberFormat';
import { AppContext } from '../../App';

const TableDataCalculated = ({index}) => {
    
    const context = useContext(AppContext)
    const formatUSD = new NumbersFormat().formatUSD;
    
  return (
    <>
        <TableData>
            {formatUSD(context.state.model[index].priceCypto)}
        </TableData>
        <TableData>
            {formatUSD(context.state.model[index].amountUSD)}
        </TableData>
    </>
  )
}   
export default TableDataCalculated;