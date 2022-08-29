import React, { useContext } from 'react'
import { AppContext } from '../../App';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableDataItem from './TableDataItem';
import TableDataMerchant from './TableDataMerchant';
import TableDataAmountCrypto from './TableDataAmountCrypto';
import TableDataCurrency from './TableDataCurrency';
import TableDataCalculated from './TableDataCalculated';

const Table = ({handleChange, handleCheckbox, rates}) => {

    const context = useContext(AppContext);

  return (
    <table cellPadding="0" cellSpacing="0" border="1">
        <TableHeader />
        <tbody>
        {context.state.model.map((s, index) => {
            debugger;
            return (
            <tr key={`tableRow${index}`}>
                <td>
                <input type="checkbox" checked={(context.state.mode === 'read' || context.state.index !== index) ? false : true} onChange={(event) => handleCheckbox(event, index)} />
                </td>
                <TableDataMerchant index={index} handleChange={handleChange} />
                <TableDataItem index={index} handleChange={handleChange} />
                <TableDataAmountCrypto index={index} handleChange={handleChange} handleCheckbox={handleCheckbox} />
                <TableDataCurrency index={index} handleChange={handleChange} handleCheckbox={handleCheckbox} rates={rates} />
                <TableDataCalculated index={index} />
            </tr>
            )
        })}
        </tbody>
        <TableFooter />
    </table>
  )
}

export default Table;