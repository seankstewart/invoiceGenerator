import React from 'react'

const TableHeader = () => {
  return (
    <thead>
        <tr>
            <th className={`td-actions`}>&nbsp;</th>
            <th className={`td-merchant`}>Merchant</th>
            <th className={`td-item`}>Item</th>
            <th className={`td-amountCrypto`}>Amount (Crypto)</th>
            <th className={`td-currency`}>Currency</th>
            <th className={`td-price-USD`}>Price/crypto (USD)</th>
            <th className={`td-amount-USD`}>Amount (USD)</th>
            <th className={`td-scrollbar`}>&nbsp;</th>
        </tr>
    </thead>
  )
}

export default TableHeader;
