import React from 'react'
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableBody from './TableBody';

const Table = () => {
  return (
    <table cellPadding="0" cellSpacing="0" border="1">
        <TableHeader />
        <TableBody />
        <TableFooter />
    </table>
  )
}

export default Table;