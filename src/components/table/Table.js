import React, { useRef, useState } from 'react'
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableBody from './TableBody';

const Table = () => {
  
  const tableRef = useRef(null);

  const [refState, setRef] = useState();

  React.useEffect(() => {
    setRef(tableRef)
  },[tableRef]);

  return (
    <table cellPadding="0" cellSpacing="0" border="1" ref={tableRef}>
        <TableHeader />
        <TableBody />
        <TableFooter tableRef={refState} />
    </table>
  )
}

export default Table;