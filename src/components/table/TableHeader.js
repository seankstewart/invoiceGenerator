import React from 'react'

const TableHeader = () => {
  return (
    <thead>
        <tr>
            <th className={`td-actions`}><input type="checkbox" disabled="disabled" /></th>
            <th className={`td-merchant`}>Merchant</th>
            <th className={`td-item`}>Item</th>
            <th className={`td-amountCrypto`}>Amount (Crypto)</th>
            <th className={`td-currency`}>Currency</th>
            <th className={`td-price-USD`}>Price/crypto (USD)</th>
            <th className={`td-amount-USD`}>Amount (USD)</th>
        </tr>
    </thead>
  )
}

export default TableHeader;
