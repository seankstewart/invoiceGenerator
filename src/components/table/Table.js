import React, { useRef, useState } from 'react'
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableBody from './TableBody';

const Table = () => {
  
  const tableRef = useRef(null);

  const [refState, setRef] = useState();

  React.useEffect(() => {
    console.log('Table props', tableRef.current);
    setRef(tableRef)
  },[tableRef]);

  console.log('refState::::::', refState);

  return (
    <table cellPadding="0" cellSpacing="0" border="1" ref={tableRef}>
        <TableHeader />
        <TableBody />
        <TableFooter tableRef={refState} />
    </table>
  )
}

export default Table;