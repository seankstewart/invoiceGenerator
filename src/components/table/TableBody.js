import React from 'react'
import { useAppContext } from '../../App'
import TableDataInput from './TableDataInput'
import TableDataStatic from './TableDataStatic'
import EditButton from '../buttons/EditButton'

const TableBody = () => {

  const context = useAppContext();
  const {state} = context;

  return (
    <tbody ref={state.tableRef}>
    {state.model.map((s, index) => {
      return (
      <tr key={`tableRow${index}`}>
          <td className={`td-actions`}><EditButton index={index} /></td>
          <TableDataInput field={'merchant'} type={'text'} index={index} />
          <TableDataInput field={'item'} type={'text'} index={index} />
          <TableDataInput field={'amountCypto'} type={'text'} index={index} />
          <TableDataInput field={'currentcy'} type={'select'} index={index} />
          <TableDataStatic field={'priceCypto'} index={index} />
          <TableDataStatic field={'amountUSD'} index={index} />
          {/* <td className={`td-scrollbar`}>&nbsp;</td> */}
      </tr>
      )
    })}
    </tbody>
  )
}

export default TableBody;